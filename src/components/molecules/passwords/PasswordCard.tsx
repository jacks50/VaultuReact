import CustomSnackbar from "@/components/atoms/snackbars/CustomSnackbar";
import { useSnackbar } from "@/hooks/useSnackbar";
import { PasswordCardInterface } from "@/interface/password/PasswordInterface";
import { DeleteRounded, EnhancedEncryptionRounded, PersonAddAlt1Rounded, PublicOutlined } from "@mui/icons-material";
import { Card, CardActionArea, CardActions, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";

export function PasswordCard({
    handleItemOpen,
    handleItemDelete,
    item
}: PasswordCardInterface) {
    const [snackbarMsg, setSnackbarMsg] = useState("");

    const {
        isOpen,
        message,
        downloadLink,
        snackbarType,
        openSnackbar,
        closeSnackbar
    } = useSnackbar();

    const handleOpenUrl = (url: string) => {
        window.open(url)?.focus;
    }

    const handleCopy = async (label: string, value: string) => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(value);
            openSnackbar(`${label} copied !`, "success");
        } else {
            openSnackbar("No clipboard found to copy text", "error");
        }
    }

    return (
        <Grid item xs={12} sm={6} md={3} key={item.passwordUID}>
            <Card key={item.passwordUID}>
                <CardActionArea onClick={() => handleItemOpen(item)}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {item.passwordName}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions disableSpacing>
                    <IconButton
                        sx={{ ml: 'auto' }}
                        aria-label="Open URL"
                        onClick={() => handleOpenUrl(item.passwordURL)}>
                        <PublicOutlined />
                    </IconButton>

                    <IconButton
                        aria-label="Copy username"
                        onClick={() => handleCopy('Username', item.passwordUsername)}>
                        <PersonAddAlt1Rounded />
                    </IconButton>

                    <IconButton
                        aria-label="Copy password"
                        onClick={() => handleCopy('Password', item.passwordValue)}>
                        <EnhancedEncryptionRounded />
                    </IconButton>

                    <IconButton
                        aria-label="Delete password"
                        color="secondary"
                        onClick={() => handleItemDelete(item.passwordUID)}>
                        <DeleteRounded />
                    </IconButton>
                </CardActions>
            </Card>

            <CustomSnackbar
                isOpen={isOpen}
                type={snackbarType}
                message={message}
                downloadLink={downloadLink}
                closeHandler={closeSnackbar} />
        </Grid>
    );
}