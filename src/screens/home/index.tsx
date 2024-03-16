import 'core-js/stable/atob';
import { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { testHandler } from '@api/auth';
import { getNewTokens } from '@utils/helpers';

interface Props {}

const HomeScreen: FC<Props> = (props) => {
  const handleTest = async () => {
    const tokens = await getNewTokens();
    const newAccessToken = tokens?.newAccessToken;
    const newRefreshToken = tokens?.newRefreshToken;

    const { err, data } = await testHandler(newAccessToken!);
    if (err) {
      console.log({ err });
      return;
    }
    console.log(data);
  };
  const handleSignout = async () => {
    console.log('signout');
  };
  return (
    <View style={styles.container}>
      <Text>HOme</Text>
      <Button title="test" onPress={handleTest} />
      <Button title="signout" onPress={handleSignout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
