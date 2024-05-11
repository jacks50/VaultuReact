export interface PasswordPageProps {

}

export interface PasswordListProps {

}

export interface PasswordItem {
    passwordID: number,
    passwordName: string,
    passwordUsername: string,
    passwordURL: string,
    passwordValue: string,
    loginId: number,
    passwordUID: string,
}

export const noPasswordItem: PasswordItem = {
    passwordID: -1,
    passwordName: "x",
    passwordUsername: "x",
    passwordURL: "x",
    passwordValue: "x",
    loginId: -1,
    passwordUID: "x"
}

export const defaultNewPasswordItem: PasswordItem = {
    passwordID: 0,
    passwordName: "",
    passwordUsername: "",
    passwordURL: "",
    passwordValue: "",
    loginId: 0,
    passwordUID: ""
}

export interface UsePasswordDialog {
    selectedPassword: PasswordItem,
    setSelectedPassword: (item: PasswordItem) => void,
    isDialogOpen: boolean,
}