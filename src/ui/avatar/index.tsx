import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '@utils/colors';

interface Props {
  uri?: string;
  size?: number;
}

const AvatarUI: FC<Props> = (props) => {
  const { uri, size = 50 } = props;
  return (
    <View style={styles.container}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ height: size, width: size, borderRadius: size / 2 }}
        />
      ) : (
        <Icon name="person-circle-outline" size={64} color={colors.PRIMARY} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AvatarUI;
