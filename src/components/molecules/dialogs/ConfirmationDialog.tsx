import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export interface ConfirmationDialogInterface {
    open: boolean,
    title: string,
    message: string,
    callback: () => void,
    dismiss: () => void,
}

export function ConfirmationDialog({
    open,
    title,
    message,
    callback,
    dismiss,
}: ConfirmationDialogInterface) {
    return (
        <Dialog
            open={ open }>
            <DialogTitle>
                { title }
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    { message }
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={ () => callback() }>Yes</Button>
                <Button onClick={ () => dismiss() }>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}