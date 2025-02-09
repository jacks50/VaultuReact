import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput, OutlinedInputProps } from "@mui/material";
import { useState } from "react";

interface IOutlinedInputProps extends OutlinedInputProps {

}

export default function PasswordField({
    fullWidth, 
    size="small", 
    ...props}: IOutlinedInputProps
) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <OutlinedInput
            type={ showPassword ? "text" : "password" }
            sx={{ width: "100%", color: 'white', '&.Mui-focused': { color: 'white' } }}
            size={ size }
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end">
                        {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                    </IconButton>
                </InputAdornment>
            }
            { ...props }
        />
    )
}