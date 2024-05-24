export type AuthStackParamList = {
  signin: undefined;
  signup: undefined;
  'forget-password': undefined;
};

export type AuthenticatedNavigatorStackParamList = {
  home: undefined;
  chats: undefined;
  products: undefined;
  'product-detail': {
    id: string;
  };
};

export type ProfileNavigatorStackParamList = {
  profile: undefined;
  'profile-chats': undefined;
  'profile-products': undefined;
  'single-product': {
    id: string;
  };
  'edit-product': {
    id: string;
  };
  chat: {
    userId: string;
  };
};
