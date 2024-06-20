import ConfirmButton from "@/components/atoms/buttons/ConfirmButton";
import PasswordField from "@/components/atoms/fields/PasswordField";
import TextInputField from "@/components/atoms/fields/TextInputField";
import CustomSnackbar from "@/components/atoms/snackbars/CustomSnackbar";
import { useSnackbar } from "@/hooks/useSnackbar";
import { NewAccountProps } from "@/interface/account/NewAccountInterface";
import { PasswordItem } from "@/interface/password/PasswordInterface";
import { FILE_DOWNLOAD } from "@/utils/constants/constants";
import { encryptFile, generateIV, generateKey, generateSalt } from "@/utils/encryption/encryptDecrypt";
import { Box, LinearProgress } from "@mui/material";
import { useState } from "react";

function NewAccount({
    usingLinks,
    handleNewAccountCancel
}: NewAccountProps) {
    const [newAccountName, setNewAccountName] = useState("");
    const [serverUrl, setServerUrl] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [isLoading, setLoading] = useState(false);

    const {
        isOpen,
        message,
        downloadLink,
        snackbarType,
        openSnackbar,
        closeSnackbar
    } = useSnackbar();

    const handleFileCreate = () => {
        if (password !== passwordConfirm) {
            openSnackbar("Passwords are not matching", "error");
            return;
        }

        setLoading(true);

        const newSalt = generateSalt();
        const newIV = generateIV();
        const newKey = generateKey(password, newSalt);

        encryptFile(
            JSON.stringify(new Map<string, PasswordItem>()),
            newKey,
            newIV,
            newSalt
        ).then((result) => {
            openSnackbar(newAccountName, "download", FILE_DOWNLOAD + encodeURIComponent(result));
            setLoading(false);
        }).catch((error) => {
            openSnackbar(error, "error");
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

            {usingLinks ?
                <TextInputField
                    placeholder="URL to server"
                    text={serverUrl}
                    setText={setServerUrl} />
                :
                <TextInputField
                    placeholder="Name of your .vault file"
                    text={newAccountName}
                    setText={setNewAccountName} />
            }

            <PasswordField
                placeholder="Password"
                password={password}
                setPassword={setPassword} />

            <PasswordField
                placeholder="Confirm password"
                password={passwordConfirm}
                setPassword={setPasswordConfirm} />

            <ConfirmButton
                onClick={handleFileCreate}
                disabled={isLoading}>
                Create file
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