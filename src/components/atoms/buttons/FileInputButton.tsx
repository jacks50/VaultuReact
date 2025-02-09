import { CloudUpload, DeleteOutlineOutlined, HighlightOffOutlined } from "@mui/icons-material";
import { Badge, Box, Button, ButtonProps, IconButton, Stack, styled } from "@mui/material";
import { ChangeEvent } from "react";

interface FileInputButtonProps extends ButtonProps {
    handleFileUpload: (fileToUpload: File | undefined) => void,
    selectedFile?: File,
    buttonLabel?: string,
}

const HiddenInputStyle = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function FileInputButton({ 
    size="medium",
    component="label",
    fullWidth,
    variant="outlined",
    handleFileUpload, 
    selectedFile, 
    buttonLabel="Select .vault file",
    ...props 
}: FileInputButtonProps) {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 1,
        }}>
            <Button
                fullWidth
                size={size}
                component={component}
                role={undefined}
                variant={variant}
                tabIndex={-1}
                startIcon={selectedFile == null ? <CloudUpload /> : null}
                {...props}>
                {selectedFile == null ? buttonLabel : selectedFile.name}
                <HiddenInputStyle type="file" accept=".vault" onChange={ (e) => handleFileUpload(e.target.files?.[0]) } />
            </Button>

            <IconButton 
                sx={{ 
                    p: 0,
                    display: selectedFile == null ? 'none': 'inline-flex',
                }} 
                color="error" 
                onClick={ (e) => handleFileUpload(undefined) }
                >
                <HighlightOffOutlined/>
            </IconButton>
        </Box>
    );
}