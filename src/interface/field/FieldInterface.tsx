import { ChangeEvent } from "react";

interface DefaultFieldProps {
    id?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export default DefaultFieldProps;