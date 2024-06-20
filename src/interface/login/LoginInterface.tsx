export interface LoginPageProps {
    
}

export interface LoginProps {
    usingLinks: boolean,
    handleNewAccountCreate: () => void,
}

export interface UseLogin {
    uploadFile: (fileToUpload: File) => void,
    uploadedFile?: File,
    startLogin: (password: string, successHandler: (result: CryptLoginData) => void, errorHandler: (err: string) => void) => void,
}

export interface CryptLoginData {
    salt: string,
    iv: CryptoJS.lib.WordArray | null,
    key: CryptoJS.lib.WordArray | null,
    decryptedContent: string,
}