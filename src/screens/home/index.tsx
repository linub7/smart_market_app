import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {}

const HomeScreen: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>HOme</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
