import { PasswordItem } from "../password/PasswordInterface";

export interface UsePasswordDialog {
    selectedPassword: PasswordItem,
    setSelectedPassword: (item: PasswordItem) => void,
    isDialogOpen: boolean,
    setDialogOpen: (open: boolean) => void,
}

export interface PasswordDialogInterface {
    item: PasswordItem, 
    open: boolean, 
    close: () => void,
    onSave: (item: PasswordItem) => void,
}

export interface UseConfirmDialog {
    dialogData: ConfirmDialogData
    setDialogData: (data: ConfirmDialogData) => void,
    confirmHandler: () => void,
    dismissHandler: () => void
}

export interface ConfirmDialogData {
    value: any,
    title: string,
    message: string,
    callback: (value: any) => void,
}

export const defaultDialogData = {
    value: undefined, 
    title: "", 
    message: "", 
    callback: () => {}
}