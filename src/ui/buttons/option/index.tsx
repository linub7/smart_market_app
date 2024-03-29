import { FC } from 'react';
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '@utils/colors';

interface Props {
  visible?: boolean;
  onPress: () => void;
}

const OptionButton: FC<Props> = (props) => {
  if (!props.visible) return null;
  return (
    <Pressable>
      <Icon
        name="ellipsis-vertical"
        color={colors.PRIMARY}
        size={20}
        onPress={props.onPress}
      />
    </Pressable>
  );
};

export default OptionButton;
