import { FC, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { colors } from '@utils/colors';

interface Props extends TextInputProps {}

const AuthInput: FC<Props> = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.PRIMARY}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[
        styles.input,
        isFocused ? styles.borderActive : styles.borderDeActive,
        props.style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderRadius: 10,
    color: colors.PRIMARY,
    padding: 15,
  },
  borderDeActive: {
    borderWidth: 1,
    borderColor: colors.DEACTIVE,
  },
  borderActive: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
  },
});

export default AuthInput;
