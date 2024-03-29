import { FC, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

import AuthInputFields from '@components/auth/input-fields';
import SubmitButton from '@components/shared/buttons/submit';
import FormComponent from '@components/shared/form';
import AuthScreensUI from '@ui/auth/screens';
import PasswordVisibilityIcon from '@ui/icons/password-visibility';
import { signupValidationSchema } from '@utils/validationSchema';
import { WELCOME_IMAGE } from 'src/constants';
import FormDivider from '@ui/divider/form';
import AppLink from '@ui/links/app';
import { AuthStackParamList } from 'src/@types/navigation';
import { ISignupUser } from 'src/@types/auth';
import { signinHandler, signupHandler } from '@api/auth';
import { updateLoggedInStateAction, updateProfileAction } from '@store/auth';
import { Keys, saveToAsyncStorage } from '@utils/asyncStorage';

interface Props {}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignupScreen: FC<Props> = (props) => {
  const [privateIcon, setPrivateIcon] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleTogglePrivateIcon = () => setPrivateIcon(!privateIcon);

  const handleSubmit = async (
    values: ISignupUser,
    actions: FormikHelpers<ISignupUser>
  ) => {
    actions.setSubmitting(true);
    const { err, data } = await signupHandler(values);
    if (err) {
      actions.setSubmitting(false);
      return Toast.show({ type: 'error', text1: err });
    }

    Toast.show({
      type: 'success',
      text1: 'You registered successfully.',
      text2: 'Please verified your account',
    });
    const signInValues = { email: values.email, password: values.password };
    const { err: signinError, data: signinData } = await signinHandler(
      signInValues
    );
    if (signinError) {
      actions.setSubmitting(false);
      return Toast.show({ type: 'error', text1: err });
    }
    if (signinData?.status === 'success') {
      await saveToAsyncStorage(
        Keys.AUTH_ACCESS_TOKEN,
        signinData?.data?.tokens?.accessToken
      );
      await saveToAsyncStorage(
        Keys.AUTH_REFRESH_TOKEN,
        signinData?.data?.tokens?.refreshToken
      );
      dispatch(updateProfileAction({ profile: signinData?.data?.profile }));
      dispatch(updateLoggedInStateAction({ loggedInState: true }));
      actions.setSubmitting(false);
    }
  };
  return (
    <FormComponent
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signupValidationSchema}
    >
      <ScrollView style={styles.formContainer}>
        <AuthScreensUI
          uri={WELCOME_IMAGE}
          heading="Online Marketplace for Used Goods"
          subHeading="Buy or sell used goods with trust. Chat directly with sellers, ensuring a seamless, authentic experience."
        >
          <AuthInputFields
            placeholder="John Doe"
            label="Name"
            name="name"
            containerStyle={styles.marginBottom}
          />

          <AuthInputFields
            placeholder="john@gmail.com"
            label="Email"
            keyboardType="email-address"
            name="email"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />

          <AuthInputFields
            placeholder="********"
            label="Password"
            secureTextEntry={privateIcon}
            name="password"
            containerStyle={styles.additionalMargin}
            rightIcon={<PasswordVisibilityIcon privateIcon={privateIcon} />}
            onRightIconPress={handleTogglePrivateIcon}
          />
          <SubmitButton btnTitle="Sign up" />
          <FormDivider />
          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => navigation.navigate('forget-password')}
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
    marginBottom: 5,
  },
  additionalMargin: {
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

export default SignupScreen;
