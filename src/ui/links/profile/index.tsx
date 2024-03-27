import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '@utils/colors';

interface Props {
  title: string;
  iconName: string;
  active?: boolean;
  onPress?(): void;
}

const ProfileLink: FC<Props> = (props) => {
  const { title, iconName, active = false, onPress } = props;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Icon
        name={iconName}
        size={28}
        color={active ? colors.ACTIVE : colors.PRIMARY}
      />
      <Text
        style={{
          color: active ? colors.ACTIVE : colors.PRIMARY,
          fontSize: 20,
          fontWeight: '500',
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 15,
  },
});

export default ProfileLink;
