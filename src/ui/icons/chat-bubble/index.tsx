import { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '@utils/colors';
import ButtonLoader from '@ui/loaders/button-loader';

interface Props {
  onPress(): void;
  isLoading: boolean;
}

const ChatBubbleIcon: FC<Props> = (props) => {
  const { onPress, isLoading } = props;

  return (
    <Pressable onPress={onPress} style={styles.chatIconStyle}>
      {isLoading ? (
        <ButtonLoader color={colors.WHITE} />
      ) : (
        <Icon name="chatbubbles-outline" size={32} color={colors.WHITE} />
      )}
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
