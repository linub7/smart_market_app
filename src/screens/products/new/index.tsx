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

import AuthInput from '@ui/auth/input';
import { colors } from '@utils/colors';
import DatePicker from '@ui/date-picker';
import OptionModal from '@components/modals/option-modal';
import { categories } from '@utils/categories';
import CategoryOption from '@ui/options/category';
import AppButton from '@ui/app-button';

interface Props {}

const defaultNewProductInfo = {
  name: '',
  description: '',
  price: '',
  category: '',
  purchasingDate: new Date(),
};

const NewProductScreen: FC<Props> = (props) => {
  const [newProductInfo, setNewProductInfo] = useState({
    ...defaultNewProductInfo,
  });
  const { category, description, name, price, purchasingDate } = newProductInfo;
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleChange = (name: string) => (text: string) =>
    setNewProductInfo({ ...newProductInfo, [name]: text });

  const handleCreateNewProduct = async () => {
    console.log({ name, description, price, category, purchasingDate });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Pressable style={styles.fileSelector}>
            <View style={styles.iconContainer}>
              <Icon name="images" size={24} color={colors.PRIMARY} />
            </View>
            <Text style={styles.btnTitle}>Add Images</Text>
          </Pressable>
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
            value={price}
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
            loading={false}
            onPress={handleCreateNewProduct}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  marginBottom: {
    marginBottom: 10,
  },
  fileSelector: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    borderRadius: 7,
  },
  btnTitle: {
    color: colors.PRIMARY,
    marginTop: 5,
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
