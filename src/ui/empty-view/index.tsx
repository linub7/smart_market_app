import { colors } from '@utils/colors';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
}

const EmptyView: FC<Props> = (props) => {
  const { title } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.PRIMARY,
    opacity: 0.6,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default EmptyView;
