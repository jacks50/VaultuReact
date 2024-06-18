import { OutlinedInput, styled } from "@mui/material";

interface TextInputFieldProps {
    text: string,
    setText: (value: string) => void,
    placeholder: string,
}

const TextInputFieldStyle = styled(OutlinedInput)({

});

export default function TextInputFieldField({ text, setText, placeholder }: TextInputFieldProps) {
    return (
        <TextInputFieldStyle
            placeholder={placeholder}
            type={"text"}
            value={text}
            fullWidth
            onChange={(e) => setText(e.target.value)}
            size="small"
        />
    )
}