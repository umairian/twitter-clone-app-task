import { createContext } from "react";

export interface UserI {
    _id: string;
    name: string;
    email: string;
    profileUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }

interface AuthContextDefaultValue {
    token: string | null;
    user: UserI | string | null;
}

const defaultValue: AuthContextDefaultValue = {
    token: null,
    user: null
}

export const AuthContext = createContext(defaultValue);
