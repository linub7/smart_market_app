import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '@utils/colors';
import HorizontalImagesList from '@components/shared/lists/horizontal-images';
import OptionModal from '@components/modals/option-modal';
import { IMAGE_OPTIONS } from 'src/constants';

interface Props {
  images: string[];
  onPress: () => Promise<void>;
  setImages: Dispatch<SetStateAction<string[]>>;
}

const ImagesRenderAndSelection: FC<Props> = (props) => {
  const { images, onPress, setImages } = props;
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleRemoveImage = (option: { value: string; id: string }) => {
    if (option.id === 'remove') {
      const filteredImages = images.filter((el) => el !== selectedImage);
      setImages([...filteredImages]);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={onPress} style={styles.fileSelector}>
          <View style={styles.iconContainer}>
            <Icon name="images" size={24} color={colors.PRIMARY} />
          </View>
          <Text style={styles.btnTitle}>Add Images</Text>
        </Pressable>
        <HorizontalImagesList
          images={images}
          onLongPress={(item) => {
            setShowImageOptions(true);
            setSelectedImage(item);
          }}
        />
      </View>
      <OptionModal
        visible={showImageOptions}
        options={IMAGE_OPTIONS}
        onPress={handleRemoveImage}
        renderItem={(item) => <Text style={styles.text}>{item.value}</Text>}
        onRequestClose={setShowImageOptions}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
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
  text: {
    fontWeight: '600',
    fontSize: 18,
    color: colors.ERROR,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});

export default ImagesRenderAndSelection;
