import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { sizes } from '@utils/size';
import CustomHeader from '@components/shared/header';
import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';
import PeerProfileInfo from '@ui/peer-profile-info';

type Props = NativeStackScreenProps<
  AuthenticatedNavigatorStackParamList,
  'chat'
>;

const ChatScreen: FC<Props> = (props) => {
  const {
    route: {
      params: {
        conversationId,
        peerProfile: { id, name, avatar },
      },
    },
  } = props;
  return (
    <View style={styles.container}>
      <CustomHeader
        title="Go Back"
        size={32}
        center={<PeerProfileInfo avatar={avatar} name={name} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.SCREEN_PADDING,
  },
});

export default ChatScreen;
