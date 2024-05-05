import { PasswordCard, PasswordItem } from "../../molecules/passwords/PasswordCard";
import React, { JSX, useContext, useState } from "react";
import { Box, Fab, Grid } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { encryptFile } from "@/utils/encryption/encryptDecrypt";
import { PasswordDialog } from "../../molecules/passwords/PasswordDialog";
import { v4 as uuid } from "uuid"
import AppToolbar from "@/components/molecules/actions/AppToolbar";
import PasswordGenerator from "./PasswordGenerator";
import { useSnackbar } from "@/hooks/useSnackbar";
import DownloadSnackbar from "@/components/atoms/snackbars/DownloadSnackbar";
import { SessionContext, defaultSessionData } from "@/context/useSessionContext";

interface PasswordProps {
    setLoading: (v: boolean) => void
}

function PasswordList({ setLoading }: PasswordProps) {
    const [ search, setSearch ] = useState("");
    const [ openNewPassword, setOpenNewPassword ] = useState(false);
    const [ openGenerator, setOpenGenerator ] = useState(false);

    const { sessionContextData, setSessionContextData } = useContext(SessionContext);
    
    const { 
        isOpen, 
        message, 
        openSnackbar, 
        closeSnackbar 
    } = useSnackbar(0);

    const handleItemSave = (itemValues: PasswordItem) => {
        const newMap = new Map(sessionContextData?.passwordList);
        newMap.set(itemValues.passwordUID, itemValues);

        setSessionContextData({
            ...sessionContextData!,
            passwordList: newMap
        });
    }

    const handleItemDelete = (itemUID: string) => {
        const newMap = new Map(sessionContextData?.passwordList);
        newMap.delete(itemUID);
        
        setSessionContextData({
            ...sessionContextData!,
            passwordList: newMap
        });
    }

    const getPasswordCards = () => {
        const passwordItems: JSX.Element[] = [];

        sessionContextData?.passwordList?.forEach((passwordItem, passwordUID) => {
            if (!search || passwordItem.passwordName.includes(search) || passwordItem.passwordURL.includes(search))
                passwordItems.push(
                    <PasswordCard
                        key={ passwordItem.passwordUID }
                        handleItemSave={ handleItemSave }
                        handleItemDelete={ handleItemDelete }
                        item={ passwordItem } />
                )
        });

        return passwordItems;
    }

    const handleListSave = () => {
        if (sessionContextData != null) {
            encryptFile(
                JSON.stringify(Object.fromEntries(sessionContextData.passwordList)),
                sessionContextData.sessionKey!,
                sessionContextData.sessionIV!,
                sessionContextData.sessionSalt!)
                .then((result) => {
                    openSnackbar("data:text/plain;charset=utf-8," + encodeURIComponent(result));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const handleLogout = () => {
        setSessionContextData(defaultSessionData);
    }

    //setLoading(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppToolbar 
                logoutHandler={ handleLogout } 
                saveListHandler={ handleListSave }
                searchHandler={ setSearch }
                setOpenGenerator={ setOpenGenerator }/>

            <Grid 
                container 
                padding={{ xs: 2, md: 4 }}
                rowSpacing={{ xs: 3, md: 2}}
                columnSpacing={{ xs: 0, md: 2 }}>
                { getPasswordCards() }
            </Grid>

            <PasswordDialog
                item={ { passwordUID: uuid() } as PasswordItem }
                open={ openNewPassword }
                setOpen={ setOpenNewPassword }
                onSave={ handleItemSave }/>

            <PasswordGenerator
                open={ openGenerator }
                closeGenerator={ () => setOpenGenerator(false) }/>

            <DownloadSnackbar
                isOpen={ isOpen }
                downloadLink={ message }
                downloadName="File updated"
                closeHandler={ closeSnackbar }/>

            <Fab 
                color="primary" 
                aria-label="add" 
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
                onClick={ () => setOpenNewPassword(true) }>
                <AddOutlined/>
            </Fab>
        </Box>
    )
}

export default PasswordList;