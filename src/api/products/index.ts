import catchAsyncError from '@api/catchError';
import client from '@api/client';

export const createProductHandler = async (
  formData: FormData,
  token: string
) => {
  try {
    const { data } = await client.post(`/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data;',
      },
    });
    return { data };
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const getAllMyProductsHandler = async (
  page: string,
  limit: string,
  token: string
) => {
  try {
    const { data } = await client.get(`/products?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const getProductsByCategoryHandler = async (
  page: string,
  limit: string,
  category: string,
  token: string
) => {
  try {
    const { data } = await client.get(
      `/categories/${category}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data };
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const getSingleProductHandler = async (id: string, token: string) => {
  try {
    const { data } = await client.get(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const deleteProductHandler = async (id: string, token: string) => {
  try {
    const { data } = await client.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const deleteSingleImageFromProductHandler = async (
  id: string,
  imageUrl: string,
  token: string
) => {
  try {
    const { data } = await client.patch(
      `/products/${id}/images`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data };
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const updateProductHandler = async (
  id: string,
  formData: FormData,
  token: string
) => {
  try {
    const { data } = await client.patch(`/products/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data;',
      },
    });
    return { data };
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};
