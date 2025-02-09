import TextInputField from "@/components/atoms/fields/TextInputField";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

export interface OTPDialogInterface {
    open: boolean,
    otpUrl: string,
    callback: (otpCode: string) => void,
    dismiss: () => void,
}

export function OTPDialog({
    open,
    otpUrl,
    callback,
    dismiss,
}: OTPDialogInterface) {
    const [otpCode, setOtpCode] = useState("");

    return (
        <Dialog
            open={open}>
            <DialogTitle>
                {"Confirm your account creation"}
            </DialogTitle>

            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                }}>
                    <Box 
                        component={"img"}
                        height={248}
                        width={248}
                        src={`https://quickchart.io/qr?size=250&text=${otpUrl}`}/>

                    <TextInputField
                        type="text"
                        text={otpCode}
                        placeholder="Name"
                        onChange={ (e) => setOtpCode(e.target.value) } />
                </Box>

            </DialogContent>

            <DialogActions>
                <Button onClick={() => callback(otpCode)}>Yes</Button>
                <Button onClick={() => dismiss()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}