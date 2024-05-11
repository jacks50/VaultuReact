import { PasswordItem } from "@/interface/password/PasswordInterface";
import { DeleteRounded, EnhancedEncryptionRounded, PersonAddAlt1Rounded } from "@mui/icons-material";
import { Card, CardActionArea, CardActions, CardContent, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { PasswordDialog } from "./PasswordDialog";

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

    const handleCopy = async (label: string, value: string) => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(value);
            setSnackbarMsg(`"${label} copied !"`);
        } else {
            setSnackbarMsg("No clipboard found to copy text");
        }
    }

    // TODO : Maybe not the best since each card has its own dialog, we should reuse that
    // TODO : Also add confirmation dialogs
    return (
        <Grid item xs={12} sm={6} md={3} key={item.passwordUID}>
            <Card key={ item.passwordUID }>
                <CardActionArea onClick={ handleOpen }>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            { item.passwordName }
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions disableSpacing>
                    <IconButton 
                        sx={{ ml: 'auto' }}
                        aria-label="Copy username"
                        onClick={ () => handleCopy('Username', item.passwordUsername) }>
                        <PersonAddAlt1Rounded/>
                    </IconButton>
                    
                    <IconButton 
                        aria-label="Copy password"
                        onClick={ () => handleCopy('Password', item.passwordValue) }>
                        <EnhancedEncryptionRounded/>
                    </IconButton>
                    
                    <IconButton 
                        aria-label="Delete password"
                        color="secondary"
                        onClick={ () => props.handleItemDelete(item.passwordUID) }>
                        <DeleteRounded/>
                    </IconButton>
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