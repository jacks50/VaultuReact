import DefaultFieldProps from "@/interface/field/FieldInterface";
import { OutlinedInput, styled } from "@mui/material";

interface TextInputFieldProps extends DefaultFieldProps {
    type: "text" | "number",
    text: string | number,
    placeholder: string,
}

const TextInputFieldStyle = styled(OutlinedInput)({

});

export default function TextInputField({ 
    id, 
    onChange, 
    type, 
    text,
    placeholder 
}: TextInputFieldProps) {
    return (
        <TextInputFieldStyle
            id={ id }
            placeholder={placeholder}
            type={type}
            value={text}
            fullWidth
            onChange={ onChange }
            size="small"
        />
    )
}