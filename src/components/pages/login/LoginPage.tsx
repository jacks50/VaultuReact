import NewAccount from "@/components/organisms/account/NewAccount";
import Login from "@/components/organisms/login/Login";
import { LoginPageProps } from "@/interface/login/LoginInterface";
import { SafetyCheckRounded } from "@mui/icons-material";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";


function LoginPage(props: LoginPageProps) {
    const [ creatingNewAccount, setCreatingNewAccount ] = useState(false);
    const [ useLinks, setUseLinks ] = useState(false);

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
            <Image
                src="logo.svg"
                alt="VaultuReact logo"
                width={140}
                height={140} />

            <Typography
                variant="h1">
                VaultuReact
            </Typography>

            {
                creatingNewAccount ?
                    <NewAccount 
                        usingLinks={ useLinks } 
                        handleNewAccountCancel={() => setCreatingNewAccount(false)} /> 
                    :
                    <Login 
                        usingLinks={ useLinks } 
                        handleNewAccountCreate={() => setCreatingNewAccount(true)} />
            }

            <FormControlLabel
                value="use_links"
                label="Use links instead of files"
                control={
                    <Switch 
                        checked={ useLinks }
                        onChange={ (e) => { setUseLinks(e.target.checked) } }
                        color="error" />
                }
                labelPlacement="top" />
        </Box>
    );
}

export default LoginPage;