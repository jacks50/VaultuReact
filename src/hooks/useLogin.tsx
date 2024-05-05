import { CryptLoginData, UseLogin } from "@/interface/login/LoginInterface";
import { getIV, getSalt, generateKey, decryptFile } from "@/utils/encryption/encryptDecrypt";
import { useState } from "react";

export function useLogin(): UseLogin {
    const [ uploadedFile, setUploadedFile ] = useState<File>();
    const [ uploadedFileContent, setUploadedFileContent ] = useState("");

    const uploadFile = (fileToUpload: File) => {
        if (fileToUpload == null)
            return;

        const reader = new FileReader();

        reader.onload = (e) => {
            if (!e.target?.result) {
                return;
            }

            setUploadedFile(fileToUpload);
            setUploadedFileContent(e.target.result as string);
        };

        reader.readAsText(fileToUpload);
    }

    const startLogin = (password: string, successHandler: (result: CryptLoginData) => void, errorHandler: (err: string) => void) => {
        const salt = getSalt(uploadedFileContent);
        const iv = getIV(uploadedFileContent);
        const key = generateKey(password, salt);

        decryptFile(uploadedFileContent, key, iv)
            .then((result) => {
                successHandler({
                    salt: salt,
                    iv: iv,
                    key: key,
                    decryptedContent: result!,
                });
            }).catch((err) => {
                errorHandler(err);
            });
    }

    return {
        uploadFile: uploadFile,
        uploadedFile: uploadedFile,
        startLogin: startLogin,
    };
}