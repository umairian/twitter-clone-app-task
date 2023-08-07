import { axiosInstance } from "./config";

export function getProfileApi({
  queryKey: [, { userId, token, searchId }],
}: {
  queryKey: [string, { userId: string; token: string; searchId: string }];
}) {
  return axiosInstance.get(`/users/${userId}/profile?userId=${searchId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function searchUsersApi({
  queryKey: [, { userId, token, searchTerm }],
}: {
  queryKey: [string, { userId: string; token: string; searchTerm: string }];
}) {
  return axiosInstance.get(`/users/${userId}/searchUsers?term=${searchTerm}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function followUserApi({
    userId,
    token,
    body,
  }: {
    userId: string;
    token: string | null;
    body: unknown;
  }) {
    return axiosInstance.post(`/users/${userId}/follow`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
