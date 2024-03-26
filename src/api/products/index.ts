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
