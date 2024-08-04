import PasswordField from "@/components/atoms/fields/PasswordField";
import TextInputField from "@/components/atoms/fields/TextInputField";
import { PasswordDialogInterface } from "@/interface/dialog/DialogInterface";
import { PasswordItem } from "@/interface/password/PasswordInterface";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

type PasswordDialogData = PasswordItem

export function PasswordDialog({
    item,
    open,
    close,
    onSave,
    debugMode,
}: PasswordDialogInterface) {
    const [ passwordData, setPasswordData ] = useState<PasswordDialogData>(item);

    useEffect(() => {
        setPasswordData(item);
    }, [item])

    const handleSave = () => {
        onSave({
            ...passwordData
        });

        close();
    }

    const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target

        setPasswordData({
            ...passwordData,
            [id]: ["passwordId", "loginId"].includes(id) ? parseInt(value) : value,
        } as PasswordDialogData)
    }

    return (
        <Dialog
            open={open}
            onClose={close}>
            <DialogTitle>
                {item.passwordName || "Add new password"}
            </DialogTitle>

            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}>
                    { debugMode && (
                    <>
                        <TextInputField
                            id="loginId"
                            type="number"
                            text={passwordData.loginId}
                            placeholder="Login ID"
                            onChange={ handleFieldChange } />

                        <TextInputField
                            id="passwordId"
                            type="number"
                            text={passwordData.passwordId}
                            placeholder="Password ID"
                            onChange={ handleFieldChange } />

                        <TextInputField
                            id="passwordUID"
                            type="text"
                            text={passwordData.passwordUID}
                            placeholder="Password UID"
                            onChange={ handleFieldChange } />
                    </>
                    )}

                    <TextInputField
                        id="passwordName"
                        type="text"
                        text={passwordData.passwordName}
                        placeholder="Name"
                        onChange={ handleFieldChange } />

                    <TextInputField
                        id="passwordURL"
                        type="text"
                        text={passwordData.passwordURL}
                        placeholder="URL"
                        onChange={ handleFieldChange } />

                    <TextInputField
                        id="passwordUsername"
                        type="text"
                        text={passwordData.passwordUsername}
                        placeholder="Username"
                        onChange={ handleFieldChange } />

                    <PasswordField
                        id="passwordValue"
                        placeholder="Password"
                        password={passwordData.passwordValue}
                        onChange={ handleFieldChange } />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={ handleSave }>Save</Button>
                <Button onClick={ close }>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}