import PasswordField from "@/components/atoms/fields/PasswordField";
import TextInputField from "@/components/atoms/fields/TextInputField";
import { PasswordItem } from "@/interface/password/PasswordInterface";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

export function PasswordDialog(props: {
    item: PasswordItem, 
    open: boolean, 
    setOpen: (open: boolean) => void,
    onSave: (item: PasswordItem) => void,
}) {
    const item = props.item;
    const open = props.open;
    const setOpen = props.setOpen;
    const onSave = props.onSave;
    
    const [ name, setName ] = useState(item.passwordName);
    const [ username, setUsername ] = useState(item.passwordUsername);
    const [ password, setPassword ] = useState(item.passwordValue);
    const [ url, setUrl ] = useState(item.passwordURL);

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        onSave({
            ...item,
            passwordName: name,
            passwordUsername: username,
            passwordValue: password,
            passwordURL: url,
        })
        setOpen(false);
    }

    const handleCancel = () => {
        setName(item.passwordName);
        setUsername(item.passwordUsername);
        setPassword(item.passwordValue);
        setUrl(item.passwordURL);
        setOpen(false);
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
            onClose={ handleClose }>
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