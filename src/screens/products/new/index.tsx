import { FC, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import mime from 'mime';

import AuthInput from '@ui/auth/input';
import { colors } from '@utils/colors';
import DatePicker from '@ui/date-picker';
import OptionModal from '@components/modals/option-modal';
import { categories } from '@utils/categories';
import CategoryOption from '@ui/options/category';
import AppButton from '@ui/app-button';
import ImagesRenderAndSelection from '@components/products/new/images-render-selection';
import {
  newProductValidationSchema,
  yupValidate,
} from '@utils/validationSchema';
import { getNewTokens } from '@utils/helpers';
import { createProductHandler } from '@api/products';
import { sizes } from '@utils/size';

interface Props {}

const defaultNewProductInfo = {
  name: '',
  description: '',
  price: 0,
  category: '',
  purchasingDate: new Date(),
};

const NewProductScreen: FC<Props> = (props) => {
  const [newProductInfo, setNewProductInfo] = useState({
    ...defaultNewProductInfo,
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { category, description, name, price, purchasingDate } = newProductInfo;

  const handleChange = (name: string) => (text: string) => {
    name === 'price'
      ? setNewProductInfo({ ...newProductInfo, [name]: +text })
      : setNewProductInfo({ ...newProductInfo, [name]: text });
  };

  const handleImageSelection = async () => {
    try {
      const { assets } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.3, // 30% Of actual quality
        allowsMultipleSelection: true,
      });
      if (!assets) return;
      const uris = assets.map(({ uri }) => uri);
      setImages([...images, ...uris]);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'OOPS! something went wrong!' });
    }
  };

  const handleCreateNewProduct = async () => {
    const { error } = await yupValidate(
      newProductValidationSchema,
      newProductInfo
    );
    if (error) return Toast.show({ type: 'error', text1: error });
    if (!images?.length)
      return Toast.show({
        type: 'error',
        text1: 'You have to insert at least one image!',
      });
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    formData.append('description', description);
    formData.append('date', purchasingDate.toString());
    formData.append('category', category);
    // appending images
    const newImages = images.map((img, index) => ({
      name: `image_${index}`,
      type: mime.getType(img),
      uri: img,
    }));
    for (const img of newImages) {
      formData.append('images', img as any);
    }

    const tokens = await getNewTokens();
    setLoading(true);
    const { err, data } = await createProductHandler(
      formData,
      tokens?.newAccessToken!
    );
    if (err) {
      console.log(err);
      Toast.show({ type: 'error', text1: err });
      setLoading(false);
      return;
    }
    setLoading(false);
    Toast.show({ type: 'success', text1: data?.data?.message });
    setNewProductInfo({ ...defaultNewProductInfo });
    setImages([]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ImagesRenderAndSelection
            images={images}
            setImages={setImages}
            onPress={handleImageSelection}
          />
          <AuthInput
            placeholder="Product Name"
            style={styles.marginBottom}
            value={name}
            onChangeText={handleChange('name')}
          />
          <AuthInput
            placeholder="Price"
            style={styles.marginBottom}
            keyboardType="numeric"
            value={price.toString()}
            onChangeText={handleChange('price')}
          />
          <DatePicker
            title="Purchasing date:"
            value={purchasingDate}
            onChange={(purchasingDate) =>
              setNewProductInfo({ ...newProductInfo, purchasingDate })
            }
          />
          <Pressable
            style={styles.categories}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.categoryTitle}>{category || 'Categories'}</Text>
            <Icon name="caret-down-outline" size={24} color={colors.PRIMARY} />
          </Pressable>
          <OptionModal
            visible={showCategoryModal}
            options={categories}
            onPress={(item) =>
              setNewProductInfo({ ...newProductInfo, category: item.value })
            }
            renderItem={(item) => (
              <CategoryOption icon={item.icon} label={item.label} />
            )}
            onRequestClose={setShowCategoryModal}
          />
          <AuthInput
            placeholder="Description"
            multiline
            numberOfLines={4}
            style={styles.description}
            value={description}
            onChangeText={handleChange('description')}
          />
          <AppButton
            btnTitle="Create Product"
            borderRadius={7}
            loading={loading}
            onPress={handleCreateNewProduct}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.SCREEN_PADDING,
  },
  marginBottom: {
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.DEACTIVE,
    borderRadius: 5,
  },
  categoryTitle: {
    color: colors.PRIMARY,
  },
  description: { marginBottom: 20, height: 'auto' },
});

export default NewProductScreen;
