'use client'

import TextInputField from "@/components/atoms/fields/TextInputField";
import CustomSnackbar from "@/components/atoms/snackbars/CustomSnackbar";
import { useLogin } from "@/hooks/useLogin";
import { useSnackbar } from "@/hooks/useSnackbar";
import { CryptLoginData, LoginProps } from "@/interface/login/LoginInterface";
import { Box, LinearProgress } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ConfirmButton from "../../atoms/buttons/ConfirmButton";
import FileInputButton from "../../atoms/buttons/FileInputButton";
import PasswordField from "../../atoms/fields/PasswordField";
import { VAULTER_ACCOUNT_NAME_KEY_REQ, VAULTER_LOGIN_URL, VAULTER_OTP_CODE_KEY } from "@/utils/constants/constants";
import { useSession } from "@/context/AppContext";

function Login({
    handleNewAccountCreate
}: LoginProps) {
    const [isLoading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [serverUrl, setServerUrl] = useState("");
    const [serverUsername, setServerUsername] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();

    const session = useSession();

    const {
        handleLocalLogin,
        handleServerLogin,
    } = useLogin();

    // todo : make it createPortal
    const {
        isOpen,
        message,
        snackbarType,
        openSnackbar,
        closeSnackbar
    } = useSnackbar();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
        }}>

            { session.useVaulter ?
                <>
                    <TextInputField
                        type="text"
                        placeholder="URL to server"
                        value={serverUrl}
                        onChange={(e) => setServerUrl(e.target.value)} />

                    <TextInputField
                        type="text"
                        placeholder="Name of account"
                        value={serverUsername}
                        onChange={(e) => setServerUsername(e.target.value)} />

                    <PasswordField
                        placeholder="Password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }
                        onKeyUp={(evt) => {
                            if (evt.key === 'Enter')
                                handleServerLogin(serverUrl, serverUsername, password, otpCode);
                        }} />

                    <PasswordField
                        placeholder="2FA code"
                        value={otpCode}
                        onChange={ (e) => setOtpCode(e.target.value) }
                        onKeyUp={(evt) => {
                            if (evt.key === 'Enter')
                                handleServerLogin(serverUrl, serverUsername, password, otpCode);
                        }} />
                </>
                :
                <>
                    <FileInputButton
                        handleFileUpload={ (fileToUpload) => setSelectedFile(fileToUpload) }
                        selectedFile={ selectedFile } />

                    <PasswordField
                        placeholder="Password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }
                        onKeyUp={(evt) => {
                            if (evt.key === 'Enter')
                                handleLocalLogin(selectedFile!, password);
                        }} />                    
                </>}

            <ConfirmButton
                onClick={ () => {
                    session.useVaulter ? 
                        handleServerLogin(serverUrl, serverUsername, password, otpCode) 
                        : handleLocalLogin(selectedFile!, password)} }>
                Log in
            </ConfirmButton>

            <ConfirmButton
                onClick={handleNewAccountCreate}
                color="success">
                Create new account
            </ConfirmButton>

            {isLoading && <LinearProgress
                color="secondary"
                style={{ width: '100%' }}
            />}

            <CustomSnackbar
                isOpen={isOpen}
                type={snackbarType}
                message={message}
                closeHandler={closeSnackbar} />
        </Box>
    )
}

export default Login;