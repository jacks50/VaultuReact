import { Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, TextField } from "@mui/material";
import { PasswordItem } from "./PasswordCard";
import { useState } from "react";
import TextInputField from "@/components/atoms/fields/TextInputField";

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
                <OutlinedInput 
                    margin="dense" 
                    fullWidth 
                    label="Name"
                    value={ name }
                    onChange={ (e) => handleFieldChange("name", e.target.value) }/>

                <OutlinedInput 
                    margin="dense" 
                    fullWidth 
                    label="Username"
                    value={ username }
                    onChange={ (e) => handleFieldChange("username", e.target.value) }/>
                    
                <OutlinedInput 
                    margin="dense" 
                    fullWidth 
                    label="Password"
                    type="password"
                    value={ password }
                    onChange={ (e) => handleFieldChange("password", e.target.value) }/>
                    
                <OutlinedInput 
                    margin="dense" 
                    fullWidth 
                    label="URL"
                    value={ url }
                    onChange={ (e) => handleFieldChange("url", e.target.value) }/>
            </DialogContent>

            <DialogActions>
                <Button onClick={ handleSave }>Save</Button>
                <Button onClick={ handleCancel }>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}