import ConfirmButton from "@/components/atoms/buttons/ConfirmButton";
import FileInputButton from "@/components/atoms/buttons/FileInputButton";
import PasswordField from "@/components/atoms/fields/PasswordField";
import TextInputField from "@/components/atoms/fields/TextInputField";
import CustomSnackbar from "@/components/atoms/snackbars/CustomSnackbar";
import { OTPDialog } from "@/components/molecules/dialogs/OTPDialog";
import { useLogin } from "@/hooks/useLogin";
import { useOTPDialog } from "@/hooks/useOTPDialog";
import { useSnackbar } from "@/hooks/useSnackbar";
import { NewAccountProps } from "@/interface/account/NewAccountInterface";
import { PasswordItem } from "@/interface/password/PasswordInterface";
import { FILE_DOWNLOAD } from "@/utils/constants/constants";
import { createEncryptedFile, encryptFile, generateIV, generateKey, generateSalt } from "@/utils/encryption/encryptDecrypt";
import { Box, Checkbox, FormControlLabel, LinearProgress, OutlinedInput, Typography } from "@mui/material";
import { useContext, useMemo, useState } from "react";

function NewAccount({
    handleNewAccountCancel
}: NewAccountProps) {
    // states used when using links to Vaulter
    const [serverUrl, setServerUrl] = useState("");

    // form states to create a new account
    const [newAccountName, setNewAccountName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    // loading state
    const [isLoading, setLoading] = useState(false);

    const {
        sessionContextData
    } = useContext(SessionContext)

    const {
        isOpen,
        message,
        downloadLink,
        snackbarType,
        openSnackbar,
        closeSnackbar
    } = useSnackbar();

    const {
        uploadFile,
        uploadedFile,
    } = useLogin();

    const {
        otpUrl,
        otpAccountName,
        setOTPData,
        openOTPDialog,
    } = useOTPDialog();

    const validateAccount = (otpCode: string) => {
        // CORRECT HERE : SIZE AND NAME ARE NULL
        const formData = new FormData();
        formData.append("vault_account_name", otpAccountName);
        formData.append("otp_code", otpCode);

        const requestOptions = {
            method: "POST",
            body: formData,
        }

        fetch(`${serverUrl}/vaulture/new_account`, requestOptions).then((response) => {
            if (!response.ok) throw new Error(response.statusText);
            
            setOTPData("", "");
            openSnackbar("Account successfully created", "success");
        }).catch((err) => {
            openSnackbar('An error occurred : ' + err, 'error');
        }).finally(() => {
            setLoading(false);
        })
    }

    const sendVaulterRequest = (fileData: File) => {
        if (fileData != null){
            // CORRECT HERE : SIZE AND NAME ARE NULL
            const formData = new FormData();
            formData.append("vault_file", fileData);

            const requestOptions = {
                method: "POST",
                files: fileData,
                body: formData,
            }

            fetch(`${serverUrl}/vaulture/new_account`, requestOptions).then((value) => {
                if (!value.ok) throw new Error();

                value.json().then((data) => {
                    if (data.otp_url && data.vault_account_name) {
                        setOTPData(data.otp_url, data.vault_account_name);
                    }
                })
            }).catch((err) => {
                openSnackbar('An error occurred : ' + err, 'error');
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    const handleFileCreate = () => {
        setLoading(true);

        if (uploadedFile) {
            sendVaulterRequest(uploadedFile);
        } else {
            createEncryptedFile(
                password, 
                passwordConfirm,
                (error) => {
                    openSnackbar(error === null ? "An error has occurred" : error, "error");
                    setLoading(false);
                },
                (result) => {
                    setLoading(false);

                    if (sessionContextData.useVaulter)
                        sendVaulterRequest(new File([result], newAccountName))
                    else
                        openSnackbar(newAccountName, "download", FILE_DOWNLOAD + encodeURIComponent(result));
                }
            );
        }
    }

    const showUploadControls = !newAccountName && !password && !passwordConfirm;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
        }}>
            { sessionContextData.useVaulter && <TextInputField
                placeholder="URL to server"
                value={serverUrl}
                onChange={ (e) => setServerUrl(e.target.value) } />}

            { sessionContextData.useVaulter && showUploadControls && 
                <>

                    { !uploadedFile && <Typography variant="subtitle2" gutterBottom align="center">
                        You can select an existing file to create a new account
                    </Typography>}
                        
                    <FileInputButton 
                        handleFileUpload={ (fileToUpload) => uploadFile(fileToUpload, (error) => openSnackbar(error ?? "An error has occurred", "error"))}
                        selectedFile={uploadedFile} />

                    { !uploadedFile && <Typography variant="subtitle2" gutterBottom align="center">
                        Or fill the fields below to create a new fresh account
                    </Typography>}
                </>}
                
            { !uploadedFile && 
                <>
                    <TextInputField
                        placeholder="Vault file name"
                        value={newAccountName}
                        onChange={ (e) => setNewAccountName(e.target.value) } />

                    <PasswordField
                        placeholder="Password"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) } />

                    <PasswordField
                        placeholder="Confirm password"
                        value={passwordConfirm}
                        onChange={ (e) => setPasswordConfirm(e.target.value) } />
                </>}

            <ConfirmButton
                onClick={handleFileCreate}
                disabled={isLoading}>
                {sessionContextData.useVaulter ? "Create new account" : "Create new file"}
            </ConfirmButton>

            <ConfirmButton
                onClick={handleNewAccountCancel}
                disabled={isLoading}
                color="secondary">
                Go back to login
            </ConfirmButton>

            {isLoading && <LinearProgress
                color="secondary"
                style={{ width: '100%' }}
            />}

            <OTPDialog
                open={openOTPDialog}
                otpUrl={otpUrl}
                callback={ validateAccount }
                dismiss={ () => setOTPData("", "") }/>

            <CustomSnackbar
                isOpen={isOpen}
                type={snackbarType}
                message={message}
                downloadLink={downloadLink}
                closeHandler={closeSnackbar} />
        </Box>

    );
}

export default NewAccount;