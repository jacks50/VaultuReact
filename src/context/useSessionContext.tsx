import { PasswordItem } from "@/interface/password/PasswordInterface";
import { createContext } from "react";

export interface SessionContextType {
    sessionContextData?: SessionContextData,
    setSessionContextData: (session: SessionContextData) => void,
}

export interface SessionContextData {
    sessionPassword: string | null,
    sessionSalt: string | null,
    sessionIV: CryptoJS.lib.WordArray | null,
    sessionKey: CryptoJS.lib.WordArray | null,
    passwordList: Map<string, PasswordItem>,
}

export const defaultSessionData: SessionContextData = {
  sessionPassword: null,
  sessionSalt: null,
  sessionIV: null,
  sessionKey: null,
  passwordList: new Map(),
}

export const SessionContext = createContext<SessionContextType>({
    sessionContextData: defaultSessionData,
    setSessionContextData: (session: SessionContextData) => {},
  });