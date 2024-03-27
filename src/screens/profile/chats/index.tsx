import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { sizes } from '@utils/size';
import CustomHeader from '@components/shared/header';

interface Props {}

const ProfileChatsScreen: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <CustomHeader title="Go Back" size={32} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.SCREEN_PADDING,
  },
});

export default ProfileChatsScreen;
