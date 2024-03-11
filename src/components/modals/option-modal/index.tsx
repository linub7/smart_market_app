import { JSX } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '@utils/colors';

interface Props<T> {
  visible: boolean;
  options: T[];
  renderItem: (item: T) => JSX.Element;
  onRequestClose: (state: boolean) => void;
  onPress: (item: T) => void;
}

const OptionModal = <T extends unknown>(props: Props<T>) => {
  const { visible, options, renderItem, onPress, onRequestClose } = props;
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={() => onRequestClose(!visible)}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {options.map((item, index) => (
              <Pressable onPress={() => onPress(item)} key={index}>
                {renderItem(item)}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    // backgroundColor: colors.BACK_DROP,
  },
  innerContainer: {
    width: '100%',
    backgroundColor: colors.DEACTIVE,
    padding: 10,
    borderRadius: 7,
    maxHeight: 200,
  },
});

export default OptionModal;
