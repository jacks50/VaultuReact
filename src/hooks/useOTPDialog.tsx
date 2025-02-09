import { useState } from "react";

interface UseOTPDialog {
    otpUrl: string,
    otpAccountName: string,
    setOTPData: (otpUrl: string, otpAccountName: string) => void,
    openOTPDialog: boolean,
}

export function useOTPDialog(): UseOTPDialog {
    const [openOTPDialog, setOpenOTPDialog] = useState(false);
    const [otpUrl, setOtpUrl] = useState("");
    const [otpAccountName, setOtpAccountName] = useState("");

    const setOTPData = (otpURL: string, accountName: string) => {
        setOtpAccountName(accountName);
        setOtpUrl(otpURL);

        setOpenOTPDialog(accountName !== "" && otpURL !== "")
    }

    return {
        otpUrl,
        otpAccountName,
        setOTPData,
        openOTPDialog
    }
}

/*
    TODO :
    - Change layouts for link usage -> Components are not really nice ...
    - Add hooks and helpers for API calls
    - Maybe check createPortal for modals
    - Correct creation of folders on Vaulter side (vault_storage does not exist)
    - Manage return of success / errors when creating account
*/