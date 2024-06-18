import { CloudUpload } from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import { ChangeEvent } from "react";

interface FileInputButtonProps {
    handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void,
    selectedFile?: File,
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

export default function FileInputButton({ handleFileUpload, selectedFile }: FileInputButtonProps) {
    return (
        <Button
            fullWidth
            size="medium"
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            startIcon={selectedFile == null ? <CloudUpload /> : null}
        >
            {selectedFile == null ? "Select .vault file" : selectedFile.name}
            <HiddenInputStyle type="file" accept=".vault" onChange={handleFileUpload} />
        </Button>
    );
}