import { PasswordItem } from "@/interface/password/PasswordInterface";
import { lib } from "crypto-js";
import { createContext } from "react";

export interface SessionContextType {
    sessionContextData?: SessionContextData,
    setSessionContextData: (session: SessionContextData) => void,
}

export interface SessionContextData {
    sessionPassword: string | null,
    sessionSalt: string | null,
    sessionIV: lib.WordArray | null,
    sessionKey: lib.WordArray | null,
    passwordList: Map<string, PasswordItem> | null,
    fileName: string | null,
}

export const defaultSessionData: SessionContextData = {
  sessionPassword: null,
  sessionSalt: null,
  sessionIV: null,
  sessionKey: null,
  passwordList: null,
  fileName: null,
}

export const SessionContext = createContext<SessionContextType>({
    sessionContextData: defaultSessionData,
    setSessionContextData: (session: SessionContextData) => {},
  });