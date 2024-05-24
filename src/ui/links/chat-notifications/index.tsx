import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '@utils/colors';
import { sizes } from '@utils/size';

interface Props {
  active?: boolean;
  onPress?(): void;
}

const ChatNotificationLink: FC<Props> = (props) => {
  const { onPress, active = false } = props;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon
        name={'chatbubble-ellipses-outline'}
        size={28}
        color={active ? colors.ACTIVE : colors.PRIMARY}
      />
      {active && <View style={styles.indicator} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    paddingHorizontal: sizes.SCREEN_PADDING,
    position: 'relative',
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: colors.ACTIVE,
    position: 'absolute',
    top: 0,
    right: 15,
    borderColor: colors.WHITE,
    borderWidth: 2,
  },
});

export default ChatNotificationLink;
