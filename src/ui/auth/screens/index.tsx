import { FC, ReactNode } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@utils/colors';

interface Props {
  uri: string;
  heading: string;
  subHeading: string;
  children: ReactNode;
}

const AuthScreensUI: FC<Props> = (props) => {
  const { uri, heading, subHeading, children } = props;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image source={{ uri }} style={styles.image} resizeMethod="resize" />
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  innerContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 5,
    color: colors.PRIMARY,
  },
  subHeading: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 14,
    color: colors.SUB,
  },
});

export default AuthScreensUI;
