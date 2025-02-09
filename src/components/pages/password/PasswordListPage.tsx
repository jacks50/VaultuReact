import PasswordList from "@/components/organisms/password/PasswordList";
import { PasswordsContext, PasswordsDispatchContext, PasswordsProvider } from "@/context/PasswordContext";
import { PasswordPageProps } from "@/interface/password/PasswordInterface";

function PasswordListPage(props: PasswordPageProps) {
    return (
        <PasswordsProvider>
            <PasswordList/>
        </PasswordsProvider>
    );
}

export default PasswordListPage;