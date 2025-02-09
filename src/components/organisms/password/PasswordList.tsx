import CustomSnackbar from "@/components/atoms/snackbars/CustomSnackbar";
import AppToolbar, { Offset } from "@/components/molecules/actions/AppToolbar";
import { ConfirmationDialog } from "@/components/molecules/dialogs/ConfirmationDialog";
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
import { useSession } from "@/context/AppContext";
import { usePasswords, usePasswordsDispatch } from "@/context/PasswordContext";
import { DELETE_PASSWORD, EDIT_PASSWORD } from "@/interface/context/ContextActions";

function PasswordList({ }: PasswordListProps) {
    const [search, setSearch] = useState("");
    const [openGenerator, setOpenGenerator] = useState(false);
    const [selectedPassword, setSelectedPassword] = useState<PasswordItem>({} as PasswordItem);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [debugMode, setDebugMode] = useState(false);
    
    const passwords = usePasswords();
    const passwordsDispatch = usePasswordsDispatch();

    const biggestID: number = useMemo(() => {
        if (!passwords)
            return 1;
        
        return Array.from(passwords.entries()!!)
                .reduce((a, b) => a[1].passwordId < b[1].passwordId ? b : a, ['', defaultNewPasswordItem])[1].passwordId + 1;
    }, [passwords]);

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
        passwordsDispatch({
            type: EDIT_PASSWORD,
            item: itemValues,
        });
    }

    const handleItemDelete = (itemValues: PasswordItem) => {
        setDialogData({
            value: itemValues,
            title: "Delete password",
            message: "Are you sure you want to delete this password ?",
            callback: () => {
                passwordsDispatch({
                    type: DELETE_PASSWORD,
                    item: itemValues,
                });
                
            }
        });
    }

    const passwordCards = useMemo(() => {
        const passwordItems: JSX.Element[] = [];

        passwords.forEach((passwordItem, passwordUID) => {
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
    }, [passwords, search]);

    const handleListSave = () => {
        if (session != null) {
            encryptFile(
                JSON.stringify(Object.fromEntries(passwords!!)),
                session.sessionKey!,
                session.sessionIV!,
                session.sessionSalt!)
                .then((result) => {
                    openSnackbar(session.fileName!, "download", FILE_DOWNLOAD + encodeURIComponent(result));
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
                passwords.size == 0 ?
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
                        { passwordCards }
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