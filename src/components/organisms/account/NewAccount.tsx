import ConfirmButton from "@/components/atoms/buttons/ConfirmButton";
import PasswordField from "@/components/atoms/fields/PasswordField";
import TextInputField from "@/components/atoms/fields/TextInputField";
import DownloadSnackbar from "@/components/atoms/snackbars/DownloadSnackbar";
import ErrorSnackbar from "@/components/atoms/snackbars/ErrorSnackbar";
import { useSnackbar } from "@/hooks/useSnackbar";
import { NewAccountProps } from "@/interface/account/NewAccountInterface";
import { PasswordItem } from "@/interface/password/PasswordInterface";
import { FILE_DOWNLOAD } from "@/utils/constants/constants";
import { encryptFile, generateIV, generateKey, generateSalt } from "@/utils/encryption/encryptDecrypt";
import { Box, LinearProgress } from "@mui/material";
import { useState } from "react";

function NewAccount({ handleNewAccountCancel }: NewAccountProps) {
    const [ newAccountName, setNewAccountName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirm, setPasswordConfirm ] = useState("");

    const [ isLoading, setLoading ] = useState(false);

    const errorSnackbarProps = useSnackbar(3000);
    const fileSnackbarProps = useSnackbar(0);

    const handleFileCreate = () => {
        if (password !== passwordConfirm) {
            errorSnackbarProps.openSnackbar("Passwords are not matching");
            return;
        }

        setLoading(true);

        const newSalt = generateSalt();
        console.log(newSalt)
        const newIV = generateIV();
        const newKey = generateKey(password, newSalt);

        encryptFile(
            JSON.stringify(new Map<string, PasswordItem>()), 
            newKey, 
            newIV,
            newSalt
        ).then((result) => {
            fileSnackbarProps.openSnackbar(FILE_DOWNLOAD + encodeURIComponent(result));
            setLoading(false);
        }).catch((error) => {
            errorSnackbarProps.openSnackbar(error);
            setLoading(false);
        });
    }

    return (
        <Box sx={{ 
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', 
            gap: 2
            }}>
                
            <TextInputField
                placeholder="Name of your .vault file"
                text={ newAccountName }
                setText={ setNewAccountName }/>

            <PasswordField
                placeholder="Password"
                password={ password }
                setPassword={ setPassword }/>

            <PasswordField
                placeholder="Confirm password"
                password={ passwordConfirm }
                setPassword={ setPasswordConfirm }/>

            <ConfirmButton
                onClick={ handleFileCreate }
                disabled={ isLoading }>
                Create file
            </ConfirmButton>

            <ConfirmButton
                onClick={ handleNewAccountCancel }
                disabled={ isLoading }
                color="secondary">
                Go back to login
            </ConfirmButton>
        
            { isLoading && <LinearProgress 
                color="secondary" 
                style={{ width: '100%' }}
                 /> }

            <ErrorSnackbar
                isOpen={ errorSnackbarProps.isOpen }
                errorMessage={ errorSnackbarProps.message }
                closeHandler={ errorSnackbarProps.closeSnackbar }/>
                
            <DownloadSnackbar
                isOpen={ fileSnackbarProps.isOpen }
                downloadLink={ fileSnackbarProps.message }
                downloadName={ `${newAccountName}.vault` }
                closeHandler={ fileSnackbarProps.closeSnackbar }/>
        </Box>

    );
}

export default NewAccount;