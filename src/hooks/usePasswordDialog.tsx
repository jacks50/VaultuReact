import { UsePasswordDialog } from "@/interface/dialog/DialogInterface";
import { PasswordItem, noPasswordItem } from "@/interface/password/PasswordInterface";
import { useState } from "react";

export function usePasswordDialog(): UsePasswordDialog {
    const [ selectedPassword, setSelectedPassword ] = useState<PasswordItem>(noPasswordItem);
    const [ isDialogOpen, setDialogOpen ] = useState(false);

    return {
        selectedPassword: selectedPassword,
        setSelectedPassword: setSelectedPassword,
        isDialogOpen: isDialogOpen,
        setDialogOpen: setDialogOpen,
    }
}