import { Alert, Snackbar } from "@mui/material";

interface ErrorSnackbarProps {
    isOpen: boolean,
    errorMessage: string,
    closeHandler: () => void,
}

export default function ErrorSnackbar({ 
    isOpen, 
    errorMessage,
    closeHandler 
}: ErrorSnackbarProps) {
    return (
        <Snackbar
            open={ isOpen }
            onClose={ closeHandler }
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert
                    onClose={ closeHandler }
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}>
                    { errorMessage }
                </Alert>
        </Snackbar>
    );
}