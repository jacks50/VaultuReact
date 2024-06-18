import { Button, styled } from "@mui/material";

interface CancelButtonProps {
}

const CancelButtonStyle = styled(Button)({

});

export default function CancelButton(props: any) {
    return (
        <CancelButtonStyle
            {...props}
            sx={{
                mt: 2, mb: 2, width: "80%"
            }}
            size="medium"
            variant="outlined">
            {props.children}
        </CancelButtonStyle>
    )
}