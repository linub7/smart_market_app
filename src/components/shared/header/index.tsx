import { FC, JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '@utils/colors';

interface Props {
  center?: JSX.Element | null;
  right?: JSX.Element | null;
  size?: number;
  title: string;
}

const CustomHeader: FC<Props> = (props) => {
  const { center, right, size = 25, title } = props;
  const navigation = useNavigation();
  const handleGoBack = () => navigation.goBack();
  return (
    <View style={styles.container}>
      {navigation.canGoBack() && (
        <Pressable onPress={handleGoBack} style={styles.leftContainer}>
          <Icon name="chevron-back-outline" color={colors.ACTIVE} size={size} />
          <Text style={styles.backTitle}>{title}</Text>
        </Pressable>
      )}
      {center}
      {right}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backTitle: {
    color: colors.ACTIVE,
    fontSize: 18,
  },
});

export default CustomHeader;
