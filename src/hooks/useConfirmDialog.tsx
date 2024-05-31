import { ConfirmDialogData, UseConfirmDialog, defaultDialogData } from "@/interface/dialog/DialogInterface";
import { useCallback, useState } from "react";

export function useConfirmDialog(): UseConfirmDialog {
    const [ dialogData, setDialogData ] = useState<ConfirmDialogData>(defaultDialogData);

    const confirmHandler = useCallback(() => {
        dialogData.callback(dialogData.value);
        setDialogData(defaultDialogData)
    }, [ dialogData ]);

    const dismissHandler = () => {
        setDialogData(defaultDialogData);
    }

    return {
        dialogData: dialogData,
        setDialogData: setDialogData,
        confirmHandler: confirmHandler,
        dismissHandler: dismissHandler,
    }
}