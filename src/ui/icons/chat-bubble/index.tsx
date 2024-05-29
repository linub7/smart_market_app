import { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '@utils/colors';

interface Props {
  onPress(): void;
}

const ChatBubbleIcon: FC<Props> = (props) => {
  const { onPress } = props;
  return (
    <Pressable onPress={onPress} style={styles.chatIconStyle}>
      <Icon name="chatbubbles-outline" size={32} color={colors.WHITE} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chatIconStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.ACTIVE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});

export default ChatBubbleIcon;
