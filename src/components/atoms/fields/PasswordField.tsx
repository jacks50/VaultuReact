import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput, styled } from "@mui/material";
import { useState } from "react";

interface PasswordFieldProps {
    password: string,
    setPassword: (value: string) => void,
}

const PasswordFieldStyle = styled(OutlinedInput)({
    
});

export default function PasswordField({ password, setPassword }: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <PasswordFieldStyle
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            sx={{ width: "80%" }}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
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