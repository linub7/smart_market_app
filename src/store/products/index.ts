import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';
import { IProduct, ProductState } from 'src/@types/product';

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsAction: (
      state,
      action: PayloadAction<{ products: IProduct[] }>
    ) => {
      const {
        payload: { products },
      } = action;
      state.products = products;
    },
    addToProductsAction: (
      state,
      action: PayloadAction<{ product: IProduct }>
    ) => {
      const {
        payload: { product },
      } = action;
      state.products.push(product);
    },
    updateProductAction: (
      state,
      action: PayloadAction<{ product: IProduct }>
    ) => {
      const {
        payload: { product },
      } = action;
      let tmpProducts = [...state.products];
      tmpProducts = tmpProducts.map((item) =>
        item.id !== product?.id ? item : product
      );
      state.products = tmpProducts;
    },
    deleteProductAction: (
      state,
      action: PayloadAction<{ productId: string }>
    ) => {
      const {
        payload: { productId },
      } = action;
      const tmpProducts = [...state.products];
      const filteredProducts = tmpProducts.filter(
        (product) => product?.id !== productId
      );
      state.products = filteredProducts;
    },
  },
});

export const {
  actions: {
    setProductsAction,
    addToProductsAction,
    updateProductAction,
    deleteProductAction,
  },
} = productSlice;

export const getProductsState = createSelector(
  (state: RootState) => state,
  ({ products }) => products
);

export default productSlice.reducer;
