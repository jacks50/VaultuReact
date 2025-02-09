import { OutlinedInput, OutlinedInputProps } from "@mui/material";

interface IOutlinedInputProps extends OutlinedInputProps {

}

export default function TextInputField({
    type="text", 
    fullWidth, 
    size="small", 
    ...props}: IOutlinedInputProps
) {
    return (
        <OutlinedInput 
            type={type}
            fullWidth
            size={size}
            {...props}/>
    )
}