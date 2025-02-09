import { SESSION_LOGIN, SESSION_LOGOUT, SESSION_EXPORT, SESSION_SAVE } from "@/interface/context/ContextActions";
import { SessionData, SessionDataAction, SessionAction } from "@/interface/context/ContextInterface";
import dynamic from "next/dynamic";
import { createContext, useContext, useReducer } from "react";
import { PasswordsProvider } from "./PasswordContext";

const LoginPage = dynamic(() => import('@/components/pages/login/LoginPage'), { ssr: false })
const PasswordListPage = dynamic(() => import('@/components/pages/password/PasswordListPage'), { ssr: false })

// context used to keep track of the session - available for whole tree
export const SessionContext = createContext<SessionData | null>(null);
// context used to define dispatch functions of reducer - available for whole tree
export const SessionDispatchContext = createContext<SessionDataAction | null>(null);

export function useSession() {
    const session = useContext(SessionContext);

    if (session == null) throw Error("SessionContext not initialized !");

    return session;
}

export function useSessionDispatch() {
    const sessionDispatch = useContext(SessionDispatchContext);

    if (sessionDispatch == null) throw Error("SessionDispatchContext not initialized !");

    return sessionDispatch;
}

export function AppProvider() {
    const [session, dispatch] = useReducer(
        sessionReducer,
        {},
    );

    return (
        <SessionContext.Provider value={session}>
            <SessionDispatchContext.Provider value={dispatch}>
                <PasswordsProvider initialValues={session.passwordList}>
                {
                    session.isLoggedIn ? <PasswordListPage /> : <LoginPage />
                }
                </PasswordsProvider> 
            </SessionDispatchContext.Provider>
        </SessionContext.Provider>
    );
}

function sessionReducer(
    session: SessionData,
    action: SessionAction
): SessionData {
    switch(action.type) {
        case SESSION_LOGIN:
            break;
        case SESSION_LOGOUT:
            break;
        case SESSION_SAVE:
            break;
        case SESSION_EXPORT:
            break;
        default:
            throw Error(`Unknown action : ${action.type}`);
    }

    return action.data;
}