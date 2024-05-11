import { PasswordItem, UsePasswordDialog, noPasswordItem } from "@/interface/password/PasswordInterface";
import { useState } from "react";

export function usePasswordDialog(): UsePasswordDialog {
    const [ selectedPassword, setSelectedPassword ] = useState<PasswordItem>(noPasswordItem);

    return {
        selectedPassword: selectedPassword,
        setSelectedPassword: setSelectedPassword,
        isDialogOpen: selectedPassword?.passwordID != -1 || false,
    }
}