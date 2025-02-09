import { ADD_PASSWORD, EDIT_PASSWORD, DELETE_PASSWORD } from "@/interface/context/ContextActions";
import { PasswordListType, PasswordListAction, PasswordAction } from "@/interface/context/ContextInterface";
import { PasswordItem } from "@/interface/password/PasswordInterface";
import { createContext, useContext, useReducer } from "react";

// context used to keep track of password states - available for whole tree
export const PasswordsContext = createContext<PasswordListType | null>(null);
// context used to define dispatch functions of reducer - available for whole tree
export const PasswordsDispatchContext = createContext<PasswordListAction | null>(null);

export function usePasswords() {
    const passwords = useContext(PasswordsContext);

    if (passwords == null) throw Error("PasswordsContext not initialized !");

    return passwords;
}

export function usePasswordsDispatch() {
    const passwordsDispatch = useContext(PasswordsDispatchContext);

    if (passwordsDispatch == null) throw Error("PasswordsDispatchContext not initialized !");

    return passwordsDispatch;
}

export function PasswordsProvider(props: any) {
    const [passwords, dispatch] = useReducer(
        passwordsReducer,
        props.initialValues,
    );

    return (
        <PasswordsContext.Provider value={passwords}>
            <PasswordsDispatchContext.Provider value={dispatch}>
                {props.children}
            </PasswordsDispatchContext.Provider>
        </PasswordsContext.Provider>
    );
}

function passwordsReducer(
    passwords: PasswordListType, 
    action: PasswordAction
): PasswordListType {
    const newMap = new Map(passwords);

    switch (action.type) {
        case 'INIT_PASSWORDS':
            break;
        case ADD_PASSWORD:
            newMap.set(action.item.passwordUID, action.item);
            break;
        case EDIT_PASSWORD:
            newMap.set(action.item.passwordUID, action.item);
            break;
        case DELETE_PASSWORD:
            newMap.delete(action.item.passwordUID);
            break;
        default:
            throw Error(`Unknown action : ${action.type}`);
    }

    return newMap;
}
