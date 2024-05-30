export type AuthStackParamList = {
  signin: undefined;
  signup: undefined;
  'forget-password': undefined;
};

export type AuthenticatedNavigatorStackParamList = {
  home: undefined;
  chats: undefined;
  products: {
    category: string;
  };
  'product-detail': {
    id: string;
  };
  chat: {
    conversationId: string;
    peerProfile: {
      id: string;
      name: string;
      avatar?: string;
    };
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
};
