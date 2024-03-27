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
  date: Date;
  images: string[];
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
}
