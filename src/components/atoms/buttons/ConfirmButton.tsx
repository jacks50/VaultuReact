import { Button, styled } from "@mui/material";

interface ConfirmButtonProps {
}

const ConfirmButtonStyle = styled(Button)({
    
});

export default function ConfirmButton(props: any) {
    return (
        <ConfirmButtonStyle
            { ...props }
            fullWidth
            size="medium"
            variant="outlined">
                { props.children }
        </ConfirmButtonStyle>
    )
}