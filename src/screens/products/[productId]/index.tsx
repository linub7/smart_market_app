import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';
import { IProduct } from 'src/@types/product';
import { getNewTokens } from '@utils/helpers';
import { getSingleProductHandler } from '@api/products';
import CustomHeader from '@components/shared/header';
import { sizes } from '@utils/size';
import ProductDetail from '@components/products/[id]/detail';
import { getAuthState } from '@store/auth';
import ChatBubbleIcon from '@ui/icons/chat-bubble';
import { getOrCreateConversationHandler } from '@api/conversation';

type Props = NativeStackScreenProps<
  AuthenticatedNavigatorStackParamList,
  'product-detail'
>;

const SingleProductDetailScreen: FC<Props> = (props) => {
  const {
    route: {
      params: { id },
    },
  } = props;
  const [product, setProduct] = useState<IProduct | null>();
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useSelector(getAuthState);

  const isProductBelongToMe = product?.seller?.id === profile?.id;
  const { navigate } =
    useNavigation<NavigationProp<AuthenticatedNavigatorStackParamList>>();

  useEffect(() => {
    handleGetSingleProduct();

    return () => {
      setProduct(null);
    };
  }, [id]);

  const handleGetSingleProduct = async () => {
    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken) return;
    const { err, data } = await getSingleProductHandler(
      id,
      tokens.newAccessToken
    );
    if (err) {
      console.log({ getSingleProductError: err });
      return;
    }
    setProduct(data?.data?.product);
  };

  const handleNavigate = async () => {
    setIsLoading(true);
    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken) {
      setIsLoading(false);
      return;
    }
    const { err, data } = await getOrCreateConversationHandler(
      product?.seller?.id!,
      tokens.newAccessToken
    );
    if (err) {
      console.log({ getOrCreateConversationError: err });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    navigate('chat', {
      conversationId: data?.data?.data,
      peerProfile: {
        id: product?.seller?.id!,
        name: product?.seller?.name!,
        avatar: product?.seller?.avatar,
      },
    });
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Go Back" size={32} />
      {product && <ProductDetail product={product} />}
      {product && !isProductBelongToMe && (
        <ChatBubbleIcon onPress={handleNavigate} isLoading={isLoading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.SCREEN_PADDING,
    flex: 1,
  },
});

export default SingleProductDetailScreen;
