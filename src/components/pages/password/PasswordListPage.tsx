import PasswordList from "@/components/organisms/password/PasswordList";
import { PasswordPageProps } from "@/interface/password/PasswordInterface";

function PasswordListPage(props: PasswordPageProps) {
    return (
        <PasswordList {...props} />
    );
}

export default PasswordListPage;