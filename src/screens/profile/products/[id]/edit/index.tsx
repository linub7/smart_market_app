import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {}

const SingleProductEditScreen: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>EDIT</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SingleProductEditScreen;
