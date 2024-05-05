import Login from "@/components/organisms/login/Login";
import { Box, Typography } from "@mui/material";

interface LoginPageProps {
    setLoading: (v: boolean) => void,
}

function LoginPage(props: LoginPageProps) {
    return (
        <Box sx={{
            m: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            backgroundColor: "#fff",
            flexGrow: 1,
            borderRadius: 2,
        }}>
            <img src="/logo.svg" width={ 140 } />

            <Typography 
                component="h1" 
                variant="h2">
                VaultuReact
            </Typography>

            <Login { ...props } />
        </Box>
    );
}

export default LoginPage;