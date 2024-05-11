import DownloadSnackbar from "@/components/atoms/snackbars/DownloadSnackbar";
import AppToolbar, { Offset } from "@/components/molecules/actions/AppToolbar";
import { SessionContext, defaultSessionData } from "@/context/useSessionContext";
import { useSnackbar } from "@/hooks/useSnackbar";
import { PasswordItem, PasswordListProps } from "@/interface/password/PasswordInterface";
import { FILE_DOWNLOAD } from "@/utils/constants/constants";
import { encryptFile } from "@/utils/encryption/encryptDecrypt";
import { AddOutlined } from "@mui/icons-material";
import { Box, Fab, Grid, Typography } from "@mui/material";
import { JSX, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { PasswordCard } from "../../molecules/passwords/PasswordCard";
import { PasswordDialog } from "../../molecules/passwords/PasswordDialog";
import PasswordGenerator from "./PasswordGenerator";

function PasswordList({}: PasswordListProps) {
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
            if (!search || 
                passwordItem.passwordName.toLowerCase().includes(search.toLowerCase()) || 
                passwordItem.passwordURL.toLowerCase().includes(search.toLowerCase()))
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
                JSON.stringify(Object.fromEntries(sessionContextData?.passwordList!!)),
                sessionContextData.sessionKey!,
                sessionContextData.sessionIV!,
                sessionContextData.sessionSalt!)
                .then((result) => {
                    openSnackbar(FILE_DOWNLOAD + encodeURIComponent(result));
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const handleLogout = () => {
        setSessionContextData(defaultSessionData);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppToolbar 
                logoutHandler={ handleLogout } 
                saveListHandler={ handleListSave }
                searchHandler={ setSearch }
                setOpenGenerator={ setOpenGenerator }/>

            <Offset/>

            { 
                sessionContextData?.passwordList?.size == 0 ?
                <Typography 
                    variant="h5"
                    align="center">
                    No passwords yet : add your first password by clicking on the + button on the bottom right
                </Typography> 
                :                
                <Grid 
                    container 
                    padding={{ xs: 2, md: 4 }}
                    rowSpacing={{ xs: 3, md: 2}}
                    columnSpacing={{ xs: 0, md: 2 }}>
                    { getPasswordCards() }
                </Grid>
            }

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
                downloadName={ sessionContextData?.fileName || "Updated file" }
                closeHandler={ closeSnackbar }/>

            <Fab 
                color="secondary" 
                aria-label="add" 
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
                onClick={ () => setOpenNewPassword(true) }>
                <AddOutlined/>
            </Fab>
        </Box>
    )
}

export default PasswordList;