type SnackbarType = "success" | "error" | "info" | "download"

interface CustomSnackbarProps {
    isOpen: boolean,
    type: SnackbarType,
    message: string,
    downloadLink?: string,
    closeHandler: () => void,
}

interface UseSnackbar {
    isOpen: boolean,
    message: string,
    downloadLink?: string,
    snackbarType: SnackbarType,
    openSnackbar: (message: string, snackbarType: SnackbarType, downloadLink?: string) => void,
    closeSnackbar: () => void,
}