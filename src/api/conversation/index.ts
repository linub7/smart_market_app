import catchAsyncError from '@api/catchError';
import client from '@api/client';

export const getOrCreateConversationHandler = async (
  id: string,
  token: string
) => {
  try {
    const { data } = await client.get(`/conversations/${id}`, {
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
