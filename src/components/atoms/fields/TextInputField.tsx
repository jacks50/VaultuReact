import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput, styled } from "@mui/material";
import { useState } from "react";

interface TextInputFieldProps {
    text: string,
    setText: (value: string) => void,
    label: string,
}

const TextInputFieldStyle = styled(OutlinedInput)({
    
});

export default function TextInputFieldField({ text, setText, label }: TextInputFieldProps) {
    return (
        <TextInputFieldStyle
            label={ label }
            type={ "text" }
            value={ text }
            sx={{ width: "100%" }}
            onChange={(e) => setText(e.target.value)}
            size="small"
        />
    )
}