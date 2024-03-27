import { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {
  getAuthState,
  loggedOutAction,
  updateLoggedInStateAction,
} from '@store/auth';
import { colors } from '@utils/colors';
import FormDivider from '@ui/divider/form';
import ProfileLink from '@ui/links/profile';
import AvatarUI from '@ui/avatar';
import { sizes } from '@utils/size';
import { ProfileNavigatorStackParamList } from 'src/@types/navigation';
import { getNewTokens } from '@utils/helpers';
import { signoutHandler } from '@api/auth';
import { clearAsyncStorage } from '@utils/asyncStorage';

interface Props {}

const ProfileScreen: FC<Props> = (props) => {
  const { profile } = useSelector(getAuthState);
  const navigation =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    const tokens = await getNewTokens();
    const { err, data } = await signoutHandler(
      tokens?.newAccessToken!,
      tokens?.newRefreshToken!
    );
    if (err) {
      console.log({ err });
      Toast.show({
        type: 'error',
        text1: 'OOPS! Something went wrong! please try again later.',
      });
      return;
    }
    await clearAsyncStorage();
    dispatch(loggedOutAction());
    dispatch(updateLoggedInStateAction({ loggedInState: false }));
    console.log(data);
    Toast.show({ type: 'success', text1: data?.data?.message });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.rowContainer}>
        <AvatarUI uri={profile?.avatar} size={80} />
        <View>
          <Text style={styles.name}>{profile?.name}</Text>
          <Text style={styles.email}>{profile?.email}</Text>
        </View>
      </View>
      <FormDivider />
      <ProfileLink
        iconName="chatbubble-ellipses-outline"
        title="Messages"
        onPress={() => navigation.navigate('profile-chats')}
      />
      <ProfileLink
        iconName="grid-outline"
        title="Your Products"
        onPress={() => navigation.navigate('profile-products')}
      />
      <ProfileLink
        iconName="exit-outline"
        title="Log out"
        onPress={handleSignout}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.SCREEN_PADDING,
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.PRIMARY,
  },
  email: {
    fontSize: 14,
    color: colors.SUB,
  },
});

export default ProfileScreen;
