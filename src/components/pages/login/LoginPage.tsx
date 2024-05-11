import NewAccount from "@/components/organisms/account/NewAccount";
import Login from "@/components/organisms/login/Login";
import { LoginPageProps } from "@/interface/login/LoginInterface";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

function LoginPage(props: LoginPageProps) {
    const [ creatingNewAccount, setCreatingNewAccount ] = useState(false);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            flexGrow: 1,
            height: '100%',
        }}>
            <img src="logo.svg" alt="VaultuReact logo" width={ 140 } height={ 140 }/>

            <Typography 
                variant="h1">
                VaultuReact
            </Typography>
            
            { 
                creatingNewAccount ?
                <NewAccount handleNewAccountCancel={ () => setCreatingNewAccount(false) } /> : 
                <Login handleNewAccountCreate={ () => setCreatingNewAccount(true) }/>
            }
        </Box>
    );
}

export default LoginPage;