export interface PasswordPageProps {

}

export interface PasswordListProps {

}

export interface PasswordCardInterface {
    handleItemOpen: (item: PasswordItem) => void,
    handleItemDelete: (itemUID: string) => void, 
    item: PasswordItem
}

export interface PasswordItem {
    passwordId: number,
    passwordName: string,
    passwordUsername: string,
    passwordURL: string,
    passwordValue: string,
    loginId: number,
    passwordUID: string,
}

export const defaultNewPasswordItem: PasswordItem = {
    passwordId: 0,
    passwordName: "",
    passwordUsername: "",
    passwordURL: "",
    passwordValue: "",
    loginId: 1,
    passwordUID: ""
}