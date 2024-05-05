'use client'

import { ChangeEvent, useContext, useState } from "react";
import FileInputButton from "../../atoms/buttons/FileInputButton";
import ConfirmButton from "../../atoms/buttons/ConfirmButton";
import PasswordField from "../../atoms/fields/PasswordField";
import ErrorSnackbar from "@/components/atoms/snackbars/ErrorSnackbar";
import { Box } from "@mui/material";
import { useSnackbar } from "@/hooks/useSnackbar";
import { SessionContext } from "@/context/useSessionContext";
import { CryptLoginData } from "@/interface/login/LoginInterface";
import { useLogin } from "@/hooks/useLogin";

interface LoginProps {
    setLoading: (v: boolean) => void
}

function Login({ setLoading }: LoginProps) {
    const [ password, setPassword ] = useState("");

    const { 
        setSessionContextData 
    } = useContext(SessionContext);

    const {
        uploadFile,
        uploadedFile,
        startLogin,
    } = useLogin();
    
    const { 
        isOpen, 
        message, 
        openSnackbar, 
        closeSnackbar 
    } = useSnackbar(3000);

    const handleLogin = () => {
        setLoading(true);

        startLogin(
            password,
            (result: CryptLoginData) => {
                setLoading(false);

                let jsonMap = JSON.parse(result.decryptedContent);

                setSessionContextData({
                    sessionPassword: password,
                    sessionSalt: result.salt,
                    sessionIV: result.iv,
                    sessionKey: result.key,
                    passwordList: new Map(Object.entries(jsonMap)),
                });
            },
            (err: any) => {
                setLoading(false);
                openSnackbar("Incorrect login / password");
                console.error(err);
            }
        );
    }

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            openSnackbar("Please select a valid file to be uploaded");
            return;
        }

        const file = e.target.files[0];

        uploadFile(file);
    }

    return (
        <Box sx={{ 
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            }}>

            <FileInputButton
                handleFileUpload={ handleFileUpload }
                selectedFile={ uploadedFile } />

            <PasswordField
                password={ password }
                setPassword={ setPassword }/>

            <ConfirmButton
                onClick={ handleLogin }
                disabled={ !(uploadedFile && password) }>
                Log in
            </ConfirmButton>

            <ErrorSnackbar 
                isOpen={ isOpen }
                errorMessage={ message }
                closeHandler={ closeSnackbar }/>
        </Box>
    )
}

export default Login;