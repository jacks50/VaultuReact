import PasswordField from "@/components/atoms/fields/PasswordField";
import TextInputField from "@/components/atoms/fields/TextInputField";
import { PasswordDialogInterface, PasswordItem } from "@/interface/password/PasswordInterface";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

export function PasswordDialog({
    item, 
    open, 
    close, 
    onSave
}: PasswordDialogInterface) {    
    const [ name, setName ] = useState(item.passwordName);
    const [ username, setUsername ] = useState(item.passwordUsername);
    const [ password, setPassword ] = useState(item.passwordValue);
    const [ url, setUrl ] = useState(item.passwordURL);

    useEffect(() => {
        setName(item.passwordName);
        setUsername(item.passwordUsername);
        setPassword(item.passwordValue);
        setUrl(item.passwordURL);
    }, [item])

    const handleSave = () => {
        onSave({
            ...item,
            passwordName: name,
            passwordUsername: username,
            passwordValue: password,
            passwordURL: url,
        })
        close();
    }

    const handleCancel = () => {
        setName(item.passwordName);
        setUsername(item.passwordUsername);
        setPassword(item.passwordValue);
        setUrl(item.passwordURL);
        close();
    }

    const handleFieldChange = (type: string, value: string) => {
        switch (type) {
            case "name": {
                setName(value);
                break;
            }
            case "username": {
                setUsername(value);
                break;
            }
            case "password": {
                setPassword(value);
                break;
            }
            case "url": {
                setUrl(value);
                break;
            }
            default: {}
        }
    }

    return (
        <Dialog
            open={ open } 
            onClose={ close }>
            <DialogTitle>
                { item.passwordName || "Add new password" }
            </DialogTitle>

            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}>
                    <TextInputField
                        text={ name }
                        placeholder="Name"
                        setText={ (value) => handleFieldChange("name", value) }/>
                    
                    <TextInputField
                        text={ url }
                        placeholder="URL"
                        setText={ (value) => handleFieldChange("url", value) }/>

                    <TextInputField
                        text={ username }
                        placeholder="Username"
                        setText={ (value) => handleFieldChange("username", value) }/>

                    <PasswordField
                        placeholder="Password"
                        password={ password }
                        setPassword={ (value) => handleFieldChange("password", value) }/>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={ handleSave }>Save</Button>
                <Button onClick={ handleCancel }>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}