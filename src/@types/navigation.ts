export type AuthStackParamList = {
  signin: undefined;
  signup: undefined;
  'forget-password': undefined;
};

export type AuthenticatedNavigatorStackParamList = {
  home: undefined;
};

export type ProfileNavigatorStackParamList = {
  profile: undefined;
  'profile-chats': undefined;
  'profile-products': undefined;
  'single-product': {
    id: string;
  };
};
