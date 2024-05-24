import { FC } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '@utils/colors';

interface Props {}

const HomeSearchBarComponent: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Icon name="search-outline" size={20} color={colors.PRIMARY} />
      <TextInput placeholder="Search" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.PRIMARY,
    padding: 10,
  },
  textInput: {
    flex: 1,
    color: colors.PRIMARY,
    fontSize: 18,
  },
});

export default HomeSearchBarComponent;
