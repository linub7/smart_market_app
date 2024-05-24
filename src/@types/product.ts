export interface INewProduct {
  name: string;
  price: number;
  purchasingDate: Date;
  category: string;
  images: string[];
  description: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  date: string;
  images: string[];
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface ILatestProduct {
  id: string;
  name: string;
  thumbnail?: string;
  category: string;
  price: number;
}

export interface ProductState {
  products: IProduct[];
}
