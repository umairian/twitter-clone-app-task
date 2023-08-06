import { createContext } from "react";

interface DynamicObject {
    [key: string]: string | number | null;
  }

interface AuthContextDefaultValue {
    token: string | null;
    user: DynamicObject | string | null;
}

const defaultValue: AuthContextDefaultValue = {
    token: null,
    user: null
}

export const AuthContext = createContext(defaultValue);
