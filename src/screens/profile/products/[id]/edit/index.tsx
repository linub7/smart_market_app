import { FC, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import mime from 'mime';

import CustomHeader from '@components/shared/header';
import { sizes } from '@utils/size';
import { colors } from '@utils/colors';
import { ProfileNavigatorStackParamList } from 'src/@types/navigation';
import { getNewTokens } from '@utils/helpers';
import { updateLoadingStateAction } from '@store/auth';
import {
  deleteSingleImageFromProductHandler,
  getSingleProductHandler,
  updateProductHandler,
} from '@api/products';
import HorizontalImagesList from '@components/shared/lists/horizontal-images';
import AuthInput from '@ui/auth/input';
import DatePicker from '@ui/date-picker';
import OptionModal from '@components/modals/option-modal';
import { categories } from '@utils/categories';
import CategoryOption from '@ui/options/category';
import AppButton from '@ui/buttons/app';
import {
  newProductValidationSchema,
  updateProductValidationSchema,
  yupValidate,
} from '@utils/validationSchema';
import { updateProductAction } from '@store/products';
import { EDIT_SCREEN_IMAGE_OPTIONS } from 'src/constants';
import ImagesRenderAndSelection from '@components/products/new/images-render-selection';

type Props = NativeStackScreenProps<
  ProfileNavigatorStackParamList,
  'single-product'
>;

const defaultProductInfo = {
  id: '',
  name: '',
  description: '',
  thumbnail: '',
  category: '',
  price: 0,
  date: new Date(),
  images: [],
  seller: {
    id: '',
    name: '',
    avatar: '',
  },
};

const SingleProductEditScreen: FC<Props> = (props) => {
  const {
    route: {
      params: { id },
    },
  } = props;

  const [product, setProduct] = useState({
    ...defaultProductInfo,
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageOptionsModal, setShowImageOptionsModal] = useState(false);

  const dispatch = useDispatch();
  const { goBack, navigate } =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  useEffect(() => {
    handleGetSingleProduct();

    return () => {};
  }, [id]);

  console.log(product.images);

  const handleGetSingleProduct = async () => {
    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken)
      return dispatch(updateLoadingStateAction({ loadingState: false }));
    const { err, data } = await getSingleProductHandler(
      id,
      tokens?.newAccessToken!
    );
    if (err) {
      console.log({ getSingleProductError: err });
      goBack();
      return;
    }
    setProduct(data?.data?.product);
  };

  const handleChange = (name: string) => (text: string) => {
    name === 'price'
      ? setProduct({ ...product, [name]: +text })
      : setProduct({ ...product, [name]: text });
  };

  const handleSelectSingleImage = (item: string) => {
    setImageUrl(item);
    setShowImageOptionsModal(true);
  };

  const handleDeselectImage = (item: string) => {
    const tmpImages = [...images];
    const filteredImages = tmpImages.filter((el) => el !== item);
    setImages(filteredImages);
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

  const handleUpdateProduct = async () => {
    const { error } = await yupValidate(updateProductValidationSchema, product);
    if (error) return Toast.show({ type: 'error', text1: error });
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('description', product.description);
    formData.append('date', product.date.toString());
    formData.append('category', product.category);
    // appending images
    if (images.length) {
      const newImages = images.map((img, index) => ({
        name: `image_${index}`,
        type: mime.getType(img),
        uri: img,
      }));
      for (const img of newImages) {
        formData.append('images', img as any);
      }
    }

    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken)
      return dispatch(updateLoadingStateAction({ loadingState: false }));
    setLoading(true);
    const { err, data } = await updateProductHandler(
      product.id,
      formData,
      tokens?.newAccessToken!
    );
    if (err) {
      console.log({ createNewProductError: err });
      Toast.show({ type: 'error', text1: err });
      setLoading(false);
      return;
    }
    console.log({ data });
    setLoading(false);
    dispatch(updateProductAction({ product: data?.data?.product }));
    Toast.show({ type: 'success', text1: data?.data?.message });
    setImages([]);
    navigate('profile-products');
  };

  const handleSingleImage = async (item: { value: string; id: string }) => {
    const { id, value } = item;
    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken)
      return dispatch(updateLoadingStateAction({ loadingState: false }));
    if (id === 'thumb') {
      console.log('thumb');
      console.log(value);
    } else {
      if (product.images?.length < 2)
        return Toast.show({
          type: 'error',
          text1: 'Sorry! Product must have at least one image.',
        });

      const { err, data } = await deleteSingleImageFromProductHandler(
        product.id,
        imageUrl,
        tokens?.newAccessToken
      );
      if (err) {
        console.log({ deleteSingleImageFromProductError: err });
        return;
      }
      const productImages = [...product?.images];
      const filteredImages = productImages.filter((el) => el !== imageUrl);
      setProduct({ ...product, images: filteredImages });
    }
  };

  if (!product) return null;
  return (
    <>
      <ScrollView style={styles.container}>
        <CustomHeader title="Go Back" size={32} />
        <Text style={styles.title}>Images</Text>
        <HorizontalImagesList
          images={product?.images || []}
          onLongPress={handleSelectSingleImage}
        />
        <HorizontalImagesList
          images={images || []}
          style={{ paddingVertical: 5 }}
          onLongPress={handleDeselectImage}
        />

        <Pressable onPress={handleImageSelection} style={styles.imageSelector}>
          <Icon name="images" size={24} color={colors.PRIMARY} />
        </Pressable>
        <View style={{ gap: 10 }}>
          <AuthInput
            placeholder="Product name"
            value={product.name}
            onChangeText={handleChange('name')}
          />
          <AuthInput
            placeholder="Price"
            keyboardType="numeric"
            value={product?.price?.toString()}
            onChangeText={handleChange('price')}
          />
          <DatePicker
            value={new Date(product.date)}
            title="Purchasing Date"
            onChange={(date) => setProduct({ ...product, date })}
          />
          <Pressable
            style={styles.categories}
            onPress={() => setShowCategoryModal(true)}
          >
            <Text style={styles.categoryTitle}>
              {product?.category || product?.category}
            </Text>
            <Icon name="caret-down-outline" size={24} color={colors.PRIMARY} />
          </Pressable>
          <OptionModal
            visible={showCategoryModal}
            options={categories}
            onPress={(item) => setProduct({ ...product, category: item.value })}
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
            value={product?.description}
            onChangeText={handleChange('description')}
          />
          <AppButton
            btnTitle="Update Product"
            borderRadius={7}
            loading={loading}
            onPress={handleUpdateProduct}
          />
        </View>
      </ScrollView>
      <OptionModal
        visible={showImageOptionsModal}
        options={EDIT_SCREEN_IMAGE_OPTIONS}
        onPress={handleSingleImage}
        renderItem={(item) => (
          <Text
            style={{
              color: item.id === 'remove' ? colors.ERROR : colors.PRIMARY,
              paddingVertical: 10,
            }}
          >
            {item.value}
          </Text>
        )}
        onRequestClose={setShowImageOptionsModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.SCREEN_PADDING,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.PRIMARY,
    marginVertical: 10,
  },
  imageSelector: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.PRIMARY,
    marginVertical: 10,
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

export default SingleProductEditScreen;
