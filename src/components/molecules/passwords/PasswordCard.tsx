import { DeleteOutlined, DeleteRounded, EnhancedEncryptionRounded, KeyOutlined, ManageAccountsOutlined, PersonAddAlt1, PersonAddAlt1Outlined, PersonAddAlt1Rounded} from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { PasswordDialog } from "./PasswordDialog";

// TODO : create interfaces folder and put it in
export interface PasswordItem {
    passwordID: number,
    passwordName: string,
    passwordUsername: string,
    passwordURL: string,
    passwordValue: string,
    loginId: number,
    passwordUID: string,
}

export function PasswordCard(props: {
    handleItemSave: (values: PasswordItem) => void, 
    handleItemDelete: (value: string) => void, 
    item: PasswordItem
}) {
    const [ open, setOpen ] = useState(false);
    const [ snackbarMsg, setSnackbarMsg ] = useState("");

    const item = props.item;

    const handleOpen = () => {
        setOpen(true);
    }

    const handleCopyUsername = async (passwordUsername: string) => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(passwordUsername);
            setSnackbarMsg("Username copied !");
        }
    }

    const handleCopyPassword = async (passwordValue: string) => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(passwordValue);
            setSnackbarMsg("Password copied !");
        }
    }

    return (
        <Grid item xs={12} sm={6} md={3} key={item.passwordUID}>
            <Card key={ item.passwordUID }>
                <CardContent>
                    <Typography variant="h5" component="div">
                        { item.passwordName }
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton 
                        aria-label="Copy username"
                        onClick={ () => handleCopyUsername(item.passwordUsername) }>
                        <PersonAddAlt1Rounded/>
                    </IconButton>
                    
                    <IconButton 
                        aria-label="Copy password"
                        onClick={ () => handleCopyPassword(item.passwordValue) }>
                        <EnhancedEncryptionRounded/>
                    </IconButton>
                    
                    <IconButton 
                        aria-label="Delete password"
                        onClick={ () => props.handleItemDelete(item.passwordUID) }>
                        <DeleteRounded/>
                    </IconButton>

                    <Button sx={{ ml: 'auto' }} onClick={handleOpen}>Open</Button>
                </CardActions>
            </Card>

            <PasswordDialog 
                item={ item } 
                open={ open } 
                setOpen={ setOpen }
                onSave={ () => props.handleItemSave(item) } />

            <Snackbar
                open={ snackbarMsg != "" }
                autoHideDuration={ 3000 }
                onClose={ () => setSnackbarMsg("") }
                message={ snackbarMsg } />
        </Grid>
    );
}