import { axiosInstance } from "./config";

export function getProfileApi({
  queryKey: [, { userId, token}]
}: { queryKey: [string, { userId: string; token: string}]}) {
  return axiosInstance.get(`/users/${userId}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
