import { Button, styled } from "@mui/material";

interface ConfirmButtonProps {
}

const ConfirmButtonStyle = styled(Button)({
    
});

export default function ConfirmButton(props: any) {
    return (
        <ConfirmButtonStyle
            { ...props }
            sx={{
                mt: 2, mb: 2, width: "80%"
            }}
            size="medium"
            variant="outlined">
                { props.children }
        </ConfirmButtonStyle>
    )
}