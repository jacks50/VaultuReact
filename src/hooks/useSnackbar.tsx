import { useEffect, useState } from "react";

export function useSnackbar(timeout: number) {
    const [ isOpen, setOpen ] = useState(false);
    const [ message, setMessage ] = useState("");

    useEffect(() => {
        if (timeout > 0 && isOpen) {
            setTimeout(() => {
                setOpen(false);
            }, timeout);
        }
    }, [isOpen, timeout]);

    const openSnackbar = (message: string) => {
        setMessage(message);
        setOpen(true);
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    return { isOpen, message, openSnackbar, closeSnackbar };
}