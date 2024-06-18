import { useEffect, useState } from "react";

export function useSnackbar(): UseSnackbar {
    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<SnackbarType>("success");
    const [downloadLink, setDownloadLink] = useState<string | undefined>();

    useEffect(() => {
        if (snackbarType != "download" && isOpen) {
            setTimeout(() => {
                setOpen(false);
            }, 3000);
        }
    }, [isOpen, snackbarType]);

    const openSnackbar = (message: string, snackbarType: SnackbarType, downloadLink?: string) => {
        setMessage(message);
        setSnackbarType(snackbarType);
        setDownloadLink(downloadLink);
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    return {
        isOpen,
        message,
        downloadLink,
        snackbarType,
        openSnackbar,
        closeSnackbar
    };
}