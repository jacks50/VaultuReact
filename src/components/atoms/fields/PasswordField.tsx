import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput, styled } from "@mui/material";
import { useState, KeyboardEvent } from "react";

interface PasswordFieldProps {
    placeholder: string,
    password: string,
    setPassword: (value: string) => void,
    onKeyPress?: (evt: KeyboardEvent<HTMLInputElement>) => void,
}

const PasswordFieldStyle = styled(OutlinedInput)({

});

export default function PasswordField({ placeholder, password, setPassword, onKeyPress }: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <PasswordFieldStyle
            placeholder={placeholder}
            type={showPassword ? "text" : "password"}
            value={password}
            sx={{ width: "100%", color: 'white', '&.Mui-focused': { color: 'white' } }}
            onChange={(e) => setPassword(e.target.value)}
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