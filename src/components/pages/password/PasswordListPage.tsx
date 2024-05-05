import PasswordList from "@/components/organisms/password/PasswordList";

interface PasswordPageProps {
    setLoading: (v: boolean) => void,
}


function PasswordListPage(props: PasswordPageProps) {
    return (
        <PasswordList { ...props }/>
    );
}

export default PasswordListPage;