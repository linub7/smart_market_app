import { FC, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { SIGNIN_IMAGE } from 'src/constants';
import AuthScreensUI from '@ui/auth/screens';
import AuthInputFields from '@components/auth/input-fields';
import FormComponent from '@components/shared/form';
import { signinValidationSchema } from '@utils/validationSchema';
import PasswordVisibilityIcon from '@ui/icons/password-visibility';
import SubmitButton from '@components/shared/buttons/submit';
import FormDivider from '@ui/divider/form';
import AppLink from '@ui/links/app';
import { AuthStackParamList } from 'src/@types/navigation';

interface Props {}

const initialValues = {
  email: '',
  password: '',
};

const SigninScreen: FC<Props> = (props) => {
  const [privateIcon, setPrivateIcon] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleTogglePrivateIcon = () => setPrivateIcon(!privateIcon);

  return (
    <FormComponent
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={signinValidationSchema}
    >
      <ScrollView style={styles.formContainer}>
        <AuthScreensUI
          uri={SIGNIN_IMAGE}
          heading="Welcome back"
          subHeading="It's nice to see you again"
        >
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

          <SubmitButton btnTitle="Sign in" />
          <FormDivider />
          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => navigation.navigate('forget-password')}
            />
            <AppLink
              title="Sign up"
              onPress={() => navigation.navigate('signup')}
            />
          </View>
        </AuthScreensUI>
      </ScrollView>
    </FormComponent>
  );
};

const styles = StyleSheet.create({
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

export default SigninScreen;
