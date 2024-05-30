import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

import { sizes } from '@utils/size';
import CustomHeader from '@components/shared/header';
import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';
import PeerProfileInfo from '@ui/peer-profile-info';
import { getAuthState } from '@store/auth';
import EmptyView from '@ui/empty-view';

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

  const { profile } = useSelector(getAuthState);

  if (!profile) return null;
  return (
    <View style={styles.container}>
      <CustomHeader
        title="Go Back"
        size={32}
        center={<PeerProfileInfo avatar={avatar} name={name} />}
      />
      <GiftedChat
        messages={[]}
        user={{
          _id: profile.id,
          name: profile.name,
          avatar: profile.avatar,
        }}
        renderChatEmpty={() => (
          <EmptyView
            title="Breaking the ice can be the hardest part, but it's worth it!Just say HELLO"
            additionalStyle={{
              transform: [{ rotateX: '180deg' }, { rotateY: '180deg' }],
            }}
          />
        )}
        onSend={(messages) => console.log(messages)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.SCREEN_PADDING,
    flex: 1,
  },
});

export default ChatScreen;
