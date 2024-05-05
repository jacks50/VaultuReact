import { useSnackbar } from "@/hooks/useSnackbar";
import { CloseOutlined } from "@mui/icons-material";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import React from "react";
import { useState } from "react";

interface DownloadSnackbarProps {
    isOpen: boolean,
    downloadLink: string,
    downloadName?: string,
    closeHandler: () => void,
}

export default function DownloadSnackbar({ 
    isOpen, 
    downloadLink, 
    downloadName,
    closeHandler 
}: DownloadSnackbarProps) {

    const snackbarActions = (
        <React.Fragment>
            <Button 
                href={ downloadLink } 
                download={ downloadName }>
                Download
            </Button>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={ closeHandler }>
                <CloseOutlined 
                    fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    return (
        <Snackbar
            open={ isOpen }
            onClose={ closeHandler }
            message={ downloadName }
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            action={ snackbarActions }>
        </Snackbar>
    );
}