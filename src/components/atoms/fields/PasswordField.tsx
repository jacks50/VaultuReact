import DefaultFieldProps from "@/interface/field/FieldInterface";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput, styled } from "@mui/material";
import { useState, KeyboardEvent } from "react";

interface PasswordFieldProps extends DefaultFieldProps {
    placeholder: string,
    password: string,
    onKeyPress?: (evt: KeyboardEvent<HTMLInputElement>) => void,
}

const PasswordFieldStyle = styled(OutlinedInput)({

});

export default function PasswordField({ 
    id, 
    onChange, 
    placeholder, 
    password, 
    onKeyPress 
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <PasswordFieldStyle
            id={ id }
            placeholder={ placeholder }
            type={ showPassword ? "text" : "password" }
            value={ password }
            sx={{ width: "100%", color: 'white', '&.Mui-focused': { color: 'white' } }}
            onChange={ onChange }
            size="small"
            onKeyDown={ onKeyPress }
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end">
                        {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                    </IconButton>
                </InputAdornment>
            }
        />
    )
}