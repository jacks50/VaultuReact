import { Alert, Snackbar } from "@mui/material";

interface ConfirmSnackbarProps {
    isOpen: boolean,
    confirmMessage: string,
    closeHandler: () => void,
}

export default function ConfirmSnackbar({ 
    isOpen, 
    confirmMessage,
    closeHandler 
}: ConfirmSnackbarProps) {
    return (
        <Snackbar
            open={ isOpen }
            onClose={ closeHandler }
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert
                    onClose={ closeHandler }
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}>
                    { confirmMessage }
                </Alert>
        </Snackbar>
    );
}