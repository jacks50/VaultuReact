import { useSessionDispatch } from "@/context/AppContext";
import { PasswordsDispatchContext, usePasswordsDispatch } from "@/context/PasswordContext";
import { SESSION_LOGIN } from "@/interface/context/ContextActions";
import { CryptLoginData, UseLogin } from "@/interface/login/LoginInterface";
import { PasswordItem } from "@/interface/password/PasswordInterface";
import { VAULTER_ACCOUNT_NAME_KEY_REQ, VAULTER_LOGIN_URL, VAULTER_OTP_CODE_KEY } from "@/utils/constants/constants";
import { decryptFile, generateKey, getIV, getSalt } from "@/utils/encryption/encryptDecrypt";

export function useLogin() {

    const sessionDispatch = useSessionDispatch();
    //const passwordsDispatch = usePasswordsDispatch();

    const handleServerLogin = async (
        serverUrl: string, 
        username: string, 
        password: string, 
        otpCode: string
    ) => {
        const formData = new FormData();
        formData.append(VAULTER_ACCOUNT_NAME_KEY_REQ, username);
        formData.append(VAULTER_OTP_CODE_KEY, otpCode);

        try {
            const loginData = await handleRequest(`${serverUrl}/${VAULTER_LOGIN_URL}`, formData);

            const fileData = new File([loginData.content], `${username}.vault`);

            handlePasswordFile(fileData, password);
        } catch (error) {

        }
    }

    const handleLocalLogin = (fileData: File, password: string) => {
        handlePasswordFile(fileData, password);
    }

    const handlePasswordFile = (fileData: File, password: string) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            if (!e.target?.result)
                throw new Error("Error on load : file empty");

            const fileContent =  e.target?.result as string;

            const salt = getSalt(fileContent);
            const iv = getIV(fileContent);
            const key = generateKey(password, salt);

            decryptFile(fileContent, key, iv)
                .then((result) => {
                    let jsonMap = JSON.parse(result!);

                    sessionDispatch({
                        type: SESSION_LOGIN,
                        data: {
                            sessionPassword: password,
                            sessionSalt: salt,
                            sessionIV: iv,
                            sessionKey: key,
                            fileName: fileData && fileData.name,
                            passwordList: new Map<string, PasswordItem>(Object.entries(jsonMap)),
                            isLoggedIn: true,
                        }
                    });
                }).catch((err) => {
                    
                });
        };

        reader.readAsText(fileData);
    }

    const handleLogout = () => {

    }

    const savePasswordFile = () => {

    }

    return {
        handleLocalLogin,
        handleServerLogin,
    }

    // -- 

    async function handleRequest(url: string, formData?: FormData) {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        })

        if (!response.ok) throw new Error(response.statusText);

        try {
            return await response.json();
        } catch(ex) {}
    } 
}