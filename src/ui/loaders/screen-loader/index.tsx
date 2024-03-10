import { FC } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { colors } from '@utils/colors';

interface Props {}

const ScreenLoader: FC<Props> = (props) => {
  return (
    <Modal animationType="fade" transparent>
      <View style={styles.container}>
        <LottieView
          source={require('../../../../assets/loading1.json')}
          autoPlay
          loop
          style={{ flex: 1, transform: [{ scale: 0.2 }] }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACK_DROP,
  },
});

export default ScreenLoader;
