import { Dispatch } from "react";
import { PasswordItem } from "../password/PasswordInterface";
import { lib } from "crypto-js";

// defines the structure of an user session
export interface SessionData {
    sessionPassword?: string,
    sessionSalt?: string,
    sessionIV?: lib.WordArray,
    sessionKey?: lib.WordArray,
    passwordList?: Map<string, PasswordItem>,
    fileName?: string,
    useVaulter?: boolean,
    vaulterURL?: string,
    isLoggedIn?: boolean,
  }

// defines an action made on passwords via dispatcher
export interface PasswordAction {
    type: string,
    item: PasswordItem,
}

// defines an action made on the session via dispatcher
export interface SessionAction {
    type: string,
    data: SessionData,
}

// typings used to make code clearer
export type PasswordListType = Map<string, PasswordItem>;
export type PasswordListAction = Dispatch<PasswordAction>;
export type SessionDataAction = Dispatch<SessionAction>;