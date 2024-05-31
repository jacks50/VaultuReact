'use client'

import ErrorSnackbar from "@/components/atoms/snackbars/ErrorSnackbar";
import { SessionContext } from "@/context/useSessionContext";
import { useLogin } from "@/hooks/useLogin";
import { useSnackbar } from "@/hooks/useSnackbar";
import { CryptLoginData, LoginProps } from "@/interface/login/LoginInterface";
import { Box, LinearProgress } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import ConfirmButton from "../../atoms/buttons/ConfirmButton";
import FileInputButton from "../../atoms/buttons/FileInputButton";
import PasswordField from "../../atoms/fields/PasswordField";

function Login({ handleNewAccountCreate }: LoginProps) {
    const [ isLoading, setLoading ] = useState(false);
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
        // TODO : still a problem here - high cpu loads that blocks the thread -> maybe a css approach can resolve that
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
                    fileName: uploadedFile && uploadedFile.name || null,
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
            gap: 2,
            }}>

            <FileInputButton
                handleFileUpload={ handleFileUpload }
                selectedFile={ uploadedFile } />

            <PasswordField
                placeholder="Password"
                password={ password }
                setPassword={ setPassword }/>

            <ConfirmButton
                onClick={ handleLogin }
                disabled={ !(uploadedFile && password) }>
                Log in
            </ConfirmButton>

            <ConfirmButton
                onClick={ handleNewAccountCreate }
                color="success">
                Create new account
            </ConfirmButton>
        
            { isLoading && <LinearProgress 
                color="secondary" 
                style={{ width: '100%' }}
                 /> }

            <ErrorSnackbar 
                isOpen={ isOpen }
                errorMessage={ message }
                closeHandler={ closeSnackbar }/>
        </Box>
    )
}

export default Login;