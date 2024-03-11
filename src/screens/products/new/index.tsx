import { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AuthInput from '@ui/auth/input';
import { colors } from '@utils/colors';
import DatePicker from '@ui/date-picker';
import OptionModal from '@components/modals/option-modal';
import { categories } from '@utils/categories';
import CategoryOption from '@ui/options/category';

interface Props {}

const NewProductScreen: FC<Props> = (props) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const handleChangeDate = (date: Date) => {
    console.log(date);
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.fileSelector}>
        <View style={styles.iconContainer}>
          <Icon name="images" size={24} color={colors.PRIMARY} />
        </View>
        <Text style={styles.btnTitle}>Add Images</Text>
      </Pressable>
      <AuthInput placeholder="Product Name" style={styles.marginBottom} />
      <AuthInput placeholder="Price" style={styles.marginBottom} />
      <DatePicker
        title="Purchasing date:"
        value={new Date()}
        onChange={handleChangeDate}
      />

      <Pressable onPress={() => setShowCategoryModal(true)}>
        <Text>Categories</Text>
      </Pressable>
      <OptionModal
        visible={showCategoryModal}
        options={categories}
        onPress={(item) => console.log(item)}
        renderItem={(item) => (
          <CategoryOption icon={item.icon} label={item.label} />
        )}
        onRequestClose={setShowCategoryModal}
      />
      <AuthInput placeholder="Description" style={styles.marginBottom} />
    </View>
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
});

export default NewProductScreen;
