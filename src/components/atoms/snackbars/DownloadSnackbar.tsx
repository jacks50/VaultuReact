import { CloseOutlined } from "@mui/icons-material";
import { Button, IconButton, Snackbar } from "@mui/material";
import React from "react";

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
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            message={ downloadName }
            action={ snackbarActions }
            ContentProps={{
                sx: {
                    border: '1px solid white',
                    bgcolor: '#000000',
                    color: 'white',
                }
            }}
            >
        </Snackbar>
    );
}