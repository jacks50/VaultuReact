import CustomSnackbar from "@/components/atoms/snackbars/CustomSnackbar";
import AppToolbar, { Offset } from "@/components/molecules/actions/AppToolbar";
import { ConfirmationDialog } from "@/components/molecules/dialogs/ConfirmationDialog";
import { SessionContext, defaultSessionData } from "@/context/useSessionContext";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { useSnackbar } from "@/hooks/useSnackbar";
import { PasswordItem, PasswordListProps, defaultNewPasswordItem } from "@/interface/password/PasswordInterface";
import { FILE_DOWNLOAD } from "@/utils/constants/constants";
import { encryptFile } from "@/utils/encryption/encryptDecrypt";
import { AddOutlined } from "@mui/icons-material";
import { Box, Fab, Grid, Typography } from "@mui/material";
import { JSX, useContext, useEffect, useMemo, useState } from "react";
import { PasswordDialog } from "../../molecules/dialogs/PasswordDialog";
import { PasswordCard } from "../../molecules/passwords/PasswordCard";
import PasswordGenerator from "./PasswordGenerator";
import { v4 as uuid } from "uuid";

function PasswordList({ }: PasswordListProps) {
    const [search, setSearch] = useState("");
    const [openGenerator, setOpenGenerator] = useState(false);
    const [selectedPassword, setSelectedPassword] = useState<PasswordItem>({} as PasswordItem);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [debugMode, setDebugMode] = useState(false);

    const { sessionContextData, setSessionContextData } = useContext(SessionContext);

    const biggestID: number = useMemo(() => {
        return Array.from(sessionContextData?.passwordList?.entries()!!)
                .reduce((a, b) => a[1].passwordId < b[1].passwordId ? b : a)[1].passwordId + 1;
    }, [sessionContextData]);

    const {
        isOpen,
        message,
        downloadLink,
        snackbarType,
        openSnackbar,
        closeSnackbar
    } = useSnackbar();

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
                        key={passwordItem.passwordUID}
                        handleItemOpen={handleItemOpen}
                        handleItemDelete={handleItemDelete}
                        item={passwordItem} />
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
                    openSnackbar(sessionContextData.fileName!, "download", FILE_DOWNLOAD + encodeURIComponent(result));
                })
                .catch((error) => {
                    openSnackbar("An error occured while trying to save the new file", "error");
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
                setOpenGenerator={setOpenGenerator}
                debugMode={debugMode}
                setDebugMode={setDebugMode}
                 />

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
                item={selectedPassword}
                open={isDialogOpen}
                close={handleItemClose}
                onSave={handleItemSave}
                debugMode={debugMode} />

            <ConfirmationDialog
                title={dialogData.title}
                message={dialogData.message}
                open={dialogData.value ? true : false}
                callback={confirmHandler}
                dismiss={dismissHandler} />

            <PasswordGenerator
                open={openGenerator}
                closeGenerator={() => setOpenGenerator(false)} />

            <CustomSnackbar
                isOpen={isOpen}
                type={snackbarType}
                message={message}
                downloadLink={downloadLink}
                closeHandler={closeSnackbar} />

            <Fab
                color="secondary"
                aria-label="add"
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
                onClick={() => {
                    setSelectedPassword({ 
                        ...defaultNewPasswordItem,
                        passwordUID: uuid(),
                        passwordId: biggestID,
                    } as PasswordItem);
                    setDialogOpen(true);
                }}>
                <AddOutlined />
            </Fab>
        </Box>
    )
}

export default PasswordList;