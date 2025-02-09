import { ChangeEvent } from "react";

export interface LoginPageProps {
    
}

export interface LoginProps {
    handleNewAccountCreate: () => void,
}

export interface UseLogin {
    uploadFile: (fileToUpload: File | undefined, onError: (error?: any) => void, onSuccess?: (result?: any) => void) => void,
    uploadedFile?: File,
    startLogin: (password: string, successHandler: (result: CryptLoginData) => void, errorHandler: (err: string) => void) => void,
}

export interface CryptLoginData {
    salt: string,
    iv: CryptoJS.lib.WordArray | null,
    key: CryptoJS.lib.WordArray | null,
    decryptedContent: string,
}