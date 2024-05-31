import DownloadSnackbar from "@/components/atoms/snackbars/DownloadSnackbar";
import AppToolbar, { Offset } from "@/components/molecules/actions/AppToolbar";
import { ConfirmationDialog } from "@/components/molecules/dialogs/ConfirmationDialog";
import { SessionContext, defaultSessionData } from "@/context/useSessionContext";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { usePasswordDialog } from "@/hooks/usePasswordDialog";
import { useSnackbar } from "@/hooks/useSnackbar";
import { PasswordItem, PasswordListProps, defaultNewPasswordItem } from "@/interface/password/PasswordInterface";
import { FILE_DOWNLOAD } from "@/utils/constants/constants";
import { encryptFile } from "@/utils/encryption/encryptDecrypt";
import { AddOutlined } from "@mui/icons-material";
import { Box, Fab, Grid, Typography } from "@mui/material";
import { JSX, useContext, useState } from "react";
import { PasswordDialog } from "../../molecules/dialogs/PasswordDialog";
import { PasswordCard } from "../../molecules/passwords/PasswordCard";
import PasswordGenerator from "./PasswordGenerator";

function PasswordList({ }: PasswordListProps) {
    const [search, setSearch] = useState("");
    const [openGenerator, setOpenGenerator] = useState(false);

    const { sessionContextData, setSessionContextData } = useContext(SessionContext);

    const {
        isOpen,
        message,
        openSnackbar,
        closeSnackbar
    } = useSnackbar(0);

    const {
        selectedPassword,
        setSelectedPassword,
        isDialogOpen,
        setDialogOpen
    } = usePasswordDialog();

    const handleItemOpen = (item: PasswordItem) => {
        setSelectedPassword(item);
        setDialogOpen(true);
    }

    const handleItemClose = () => {
        setDialogOpen(false);
    }

    const handleItemSave = (itemValues: PasswordItem) => {
        const newMap = new Map(sessionContextData?.passwordList);
        newMap.set(itemValues.passwordUID, itemValues);

        setSessionContextData({
            ...sessionContextData!,
            passwordList: newMap
        });
    }

    const handleItemDelete = (itemUID: string) => {
        setDialogData({
            value: itemUID,
            title: "Delete password",
            message: "Are you sure you want to delete this password ?",
            callback: (itemToDelete: string) => {
                const newMap = new Map(sessionContextData?.passwordList);
                newMap.delete(itemToDelete);
                
                setSessionContextData({
                    ...sessionContextData!,
                    passwordList: newMap
                });
            }
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
                        handleItemOpen={ handleItemOpen }
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
        setDialogData({
            value: true,
            title: "Logout",
            message: "Are you sure you want to logout ?",
            callback: () => {
                setSessionContextData(defaultSessionData);
            }
        });        
    }

    const {
        dialogData,
        setDialogData,
        confirmHandler,
        dismissHandler,
    } = useConfirmDialog();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppToolbar
                logoutHandler={handleLogout}
                saveListHandler={handleListSave}
                searchHandler={setSearch}
                setOpenGenerator={setOpenGenerator} />

            <Offset />

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
                        rowSpacing={{ xs: 3, md: 2 }}
                        columnSpacing={{ xs: 0, md: 2 }}>
                        {getPasswordCards()}
                    </Grid>
            }

            <PasswordDialog
                item={ selectedPassword }
                open={ isDialogOpen }
                close={ handleItemClose }
                onSave={ handleItemSave } />

            <ConfirmationDialog
                title={ dialogData.title }
                message={ dialogData.message }
                open={ dialogData.value ? true : false }
                callback={ confirmHandler }
                dismiss={ dismissHandler } />

            <PasswordGenerator
                open={openGenerator}
                closeGenerator={() => setOpenGenerator(false)} />

            <DownloadSnackbar
                isOpen={isOpen}
                downloadLink={message}
                downloadName={sessionContextData?.fileName || "Updated file"}
                closeHandler={closeSnackbar} />

            <Fab
                color="secondary"
                aria-label="add"
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
                onClick={() => {
                    setSelectedPassword({ ...defaultNewPasswordItem } as PasswordItem);
                    setDialogOpen(true);
                }}>
                <AddOutlined />
            </Fab>
        </Box>
    )
}

export default PasswordList;