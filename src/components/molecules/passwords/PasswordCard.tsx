import { PasswordCardInterface } from "@/interface/password/PasswordInterface";
import { DeleteRounded, EnhancedEncryptionRounded, PersonAddAlt1Rounded, PublicOutlined } from "@mui/icons-material";
import { Card, CardActionArea, CardActions, CardContent, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import { useState } from "react";

export function PasswordCard({
    handleItemOpen,
    handleItemDelete,
    item
}: PasswordCardInterface) {
    const [ snackbarMsg, setSnackbarMsg ] = useState("");

    const handleOpenUrl = (url: string) => {
        window.open(url)?.focus;
    }

    const handleCopy = async (label: string, value: string) => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(value);
            setSnackbarMsg(`${label} copied !`);
        } else {
            setSnackbarMsg("No clipboard found to copy text");
        }
    }

    // TODO : Maybe not the best since each card has its own dialog, we should reuse that
    // TODO : Also add confirmation dialogs
    return (
        <Grid item xs={12} sm={6} md={3} key={item.passwordUID}>
            <Card key={ item.passwordUID }>
                <CardActionArea onClick={ () => handleItemOpen(item) }>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            { item.passwordName }
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions disableSpacing>
                    <IconButton 
                        sx={{ ml: 'auto' }}
                        aria-label="Open URL"
                        onClick={ () => handleOpenUrl(item.passwordURL) }>
                        <PublicOutlined/>
                    </IconButton>

                    <IconButton 
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
                        onClick={ () => handleItemDelete(item.passwordUID) }>
                        <DeleteRounded/>
                    </IconButton>
                </CardActions>
            </Card>

            <Snackbar
                open={ snackbarMsg != "" }
                autoHideDuration={ 3000 }
                onClose={ () => setSnackbarMsg("") }
                message={ snackbarMsg } />
        </Grid>
    );
}