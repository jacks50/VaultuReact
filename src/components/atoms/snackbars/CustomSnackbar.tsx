import { CloseOutlined } from "@mui/icons-material";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import React from "react";

export default function CustomSnackbar({
    isOpen,
    type,
    message,
    downloadLink,
    closeHandler,
}: CustomSnackbarProps) {
    return (
        <>
            {type == "download" ?
                <Snackbar
                    open={isOpen}
                    onClose={closeHandler}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    message={message}
                    action={
                        <React.Fragment>
                            <Button
                                href={downloadLink!}
                                download={message}>
                                Download
                            </Button>

                            <IconButton
                                size="small"
                                aria-label="close"
                                color="inherit"
                                onClick={closeHandler}>
                                <CloseOutlined
                                    fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                    ContentProps={{
                        sx: {
                            border: '1px solid white',
                            bgcolor: '#000000',
                            color: 'white',
                        }
                    }}
                >
                </Snackbar>
                :
                <Snackbar
                    open={isOpen}
                    onClose={closeHandler}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                    <Alert
                        onClose={closeHandler}
                        severity={type}
                        variant="filled"
                        sx={{ width: "100%" }}>
                        {message}
                    </Alert>
                </Snackbar>
            }
        </>
    );
}