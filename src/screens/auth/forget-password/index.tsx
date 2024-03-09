import { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import AuthInputFields from '@components/auth/input-fields';
import SubmitButton from '@components/shared/buttons/submit';
import FormComponent from '@components/shared/form';
import AuthScreensUI from '@ui/auth/screens';
import { forgotPasswordValidationSchema } from '@utils/validationSchema';
import { FORGOT_PASSWORD_IMAGE } from 'src/constants';
import FormDivider from '@ui/divider/form';
import AppLink from '@ui/links/app';
import { AuthStackParamList } from 'src/@types/navigation';

interface Props {}

const initialValues = {
  email: '',
};

const ForgetPasswordScreen: FC<Props> = (props) => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <FormComponent
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={forgotPasswordValidationSchema}
    >
      <ScrollView style={styles.formContainer}>
        <AuthScreensUI
          uri={FORGOT_PASSWORD_IMAGE}
          heading="Forgot your password?!"
          subHeading="Don't worry, we'll send a link to reset your password."
        >
          <AuthInputFields
            placeholder="john@gmail.com"
            label="Email"
            keyboardType="email-address"
            name="email"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />

          <SubmitButton btnTitle="Send Password Recovery Link" />
          <FormDivider />
          <View style={styles.linkContainer}>
            <AppLink
              title="Sign up"
              onPress={() => navigation.navigate('signup')}
            />
            <AppLink
              title="Sign in"
              onPress={() => navigation.navigate('signin')}
            />
          </View>
        </AuthScreensUI>
      </ScrollView>
    </FormComponent>
  );
};

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 5,
  },
});

export default ForgetPasswordScreen;
