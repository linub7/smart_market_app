import { FC, useEffect, useState, JSX } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';

import { deleteProductHandler, getSingleProductHandler } from '@api/products';
import ProductDetail from '@components/products/[id]/detail';
import CustomHeader from '@components/shared/header';
import { getNewTokens } from '@utils/helpers';
import { sizes } from '@utils/size';
import { ProfileNavigatorStackParamList } from 'src/@types/navigation';
import { IProduct } from 'src/@types/product';
import { getAuthState, updateLoadingStateAction } from '@store/auth';
import OptionButton from '@ui/buttons/option';
import OptionModal from '@components/modals/option-modal';
import { colors } from '@utils/colors';
import { deleteProductAction } from '@store/products';
import ChatBubbleIcon from '@ui/icons/chat-bubble';
import { getOrCreateConversationHandler } from '@api/conversation';

type Props = NativeStackScreenProps<
  ProfileNavigatorStackParamList,
  'single-product'
>;

const MENU_OPTIONS = [
  {
    name: 'Edit',
    icon: <Icon name="pencil-outline" size={24} color={colors.PRIMARY} />,
  },
  {
    name: 'Delete',
    icon: <Icon name="trash-outline" size={24} color={colors.ERROR} />,
  },
];
const SingleProductScreen: FC<Props> = (props) => {
  const {
    route: {
      params: { id },
    },
  } = props;
  const [product, setProduct] = useState<IProduct>();
  const [isShowMenu, setIsShowMenu] = useState(false);

  const dispatch = useDispatch();
  const { profile } = useSelector(getAuthState);
  const { goBack, navigate } =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const isProductBelongToMe = product?.seller?.id === profile?.id;

  useEffect(() => {
    handleGetSingleProduct();

    return () => {};
  }, [id]);

  const handleNavigate = async () => {
    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken) return;
    const { err, data } = await getOrCreateConversationHandler(
      product?.seller?.id!,
      tokens.newAccessToken
    );
    if (err) {
      console.log({ getOrCreateConversationError: err });
      return;
    }
    navigate('chat', { userId: product?.seller?.id! });
  };

  const handleGetSingleProduct = async () => {
    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken)
      return dispatch(updateLoadingStateAction({ loadingState: false }));
    const { err, data } = await getSingleProductHandler(
      id,
      tokens?.newAccessToken!
    );
    if (err) {
      console.log({ getSingleProductError: err });
      goBack();
      return;
    }
    setProduct(data?.data?.product);
  };

  const confirmDeleteHandler = async () => {
    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken)
      return dispatch(updateLoadingStateAction({ loadingState: false }));
    const { err, data } = await deleteProductHandler(
      product?.id!,
      tokens?.newAccessToken!
    );
    if (err) {
      console.log({ deleteProductError: err });
      Toast.show({ type: 'error', text1: err });
      return;
    }
    dispatch(deleteProductAction({ productId: product?.id! }));
    Toast.show({ type: 'success', text1: data?.data?.message });
    navigate('profile-products');
  };

  const handleClickModal = async (option: {
    name: string;
    icon: JSX.Element;
  }) => {
    if (option.name === 'Delete') {
      Alert.alert(
        'Are you sure?',
        'This action will remove this product permanently',
        [
          {
            text: 'Delete',
            style: 'destructive',
            onPress: confirmDeleteHandler,
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    } else {
      navigate('edit-product', { id: product?.id! });
    }
  };
  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: isShowMenu ? colors.BACK_DROP : colors.WHITE },
        ]}
      >
        <CustomHeader
          title="Go Back"
          size={32}
          right={
            <OptionButton
              visible={isProductBelongToMe}
              onPress={() => setIsShowMenu(true)}
            />
          }
        />
        <View style={styles.innerContainer}>
          {product && <ProductDetail product={product} />}
        </View>
      </View>
      {product && !isProductBelongToMe && (
        <ChatBubbleIcon onPress={handleNavigate} />
      )}
      <OptionModal
        visible={isShowMenu}
        onRequestClose={setIsShowMenu}
        onPress={handleClickModal}
        options={MENU_OPTIONS}
        renderItem={({ icon, name }) => (
          <View style={styles.rowContainer}>
            {icon}
            <Text
              style={{
                color: name === 'Delete' ? colors.ERROR : colors.PRIMARY,
                fontSize: 18,
              }}
            >
              {name}
            </Text>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.SCREEN_PADDING,
  },
  innerContainer: {
    marginTop: 25,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
});

export default SingleProductScreen;
