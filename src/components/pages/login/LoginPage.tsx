import NewAccount from "@/components/organisms/account/NewAccount";
import Login from "@/components/organisms/login/Login";
import { SessionContext, SessionDispatchContext, useSession, useSessionDispatch } from "@/context/AppContext";
import { SESSION_SAVE } from "@/interface/context/ContextActions";
import { LoginPageProps } from "@/interface/login/LoginInterface";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Image from "next/image";
import { useContext, useState } from "react";


function LoginPage(props: LoginPageProps) {
    const [creatingNewAccount, setCreatingNewAccount] = useState(false);
    
    const currentSession = useSession();
    const sessionDispatch = useSessionDispatch();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            height: '100%',
        }}>
            <Image
                src="logo.svg"
                alt="VaultuReact logo"
                width={140}
                height={140} />

            <Typography
                variant="h1"
                sx={{ mt: 2, mb: 2, }}>
                VaultuReact
            </Typography>
            
            <FormControlLabel
                value="use_links"
                label="Use a Vaulter instance URL"
                labelPlacement="start"
                control={
                    <Checkbox 
                        checked={ currentSession?.useVaulter }
                        onChange={ (e) => { 
                            sessionDispatch?.({
                                type: SESSION_SAVE,
                                data: { 
                                    ...currentSession,
                                    useVaulter: e.target.checked,
                                }
                            })
                        } }
                        color="error" />
                } />

            { creatingNewAccount ? 
            <NewAccount handleNewAccountCancel={ () => setCreatingNewAccount(false) }/> 
            : 
            <Login handleNewAccountCreate={ () => setCreatingNewAccount(true) }/>}
        </Box>
    );
}

export default LoginPage;