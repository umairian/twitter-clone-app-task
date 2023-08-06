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
