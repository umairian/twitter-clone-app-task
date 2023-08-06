import { axiosInstance } from "./config";

export function signUpApi(body: unknown) {
  return axiosInstance.post("/users", body);
}
