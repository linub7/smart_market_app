import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AvatarUI from '@ui/avatar';
import { colors } from '@utils/colors';

interface Props {
  avatar?: string;
  name: string;
}

const PeerProfileInfo: FC<Props> = (props) => {
  const { avatar, name } = props;
  return (
    <View style={styles.container}>
      <AvatarUI uri={avatar} size={35} iconSize={35} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  name: {
    color: colors.PRIMARY,
    fontWeight: '600',
  },
});

export default PeerProfileInfo;
