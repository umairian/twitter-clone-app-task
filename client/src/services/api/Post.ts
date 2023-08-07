import { axiosInstance } from "./config";

export function addPostApi({
  userId,
  token,
  body,
}: {
  userId?: string;
  token?: string | null;
  body: unknown;
}) {
  return axiosInstance.post(`/users/${userId}/posts`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deletePostApi({
    userId,
    token,
    postId,
  }: {
    userId: string;
    token: string | null;
    postId: string;
  }) {
    return axiosInstance.delete(`/users/${userId}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
