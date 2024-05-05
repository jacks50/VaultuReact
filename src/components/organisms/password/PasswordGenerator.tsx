import { getRandomChar, shuffleString } from "@/utils/encryption/passwordUtil";
import { AbcOutlined, EmojiSymbolsOutlined, NumbersOutlined } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Slider, TextField } from "@mui/material";
import { useState } from "react";

const LOWERCASE_CHAR = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_CHAR = LOWERCASE_CHAR.toUpperCase();
const DIGITS = "0123456789";
const SPECIAL_CHAR = "+*%&=-!?$/.(){}";

interface PasswordGeneratorProps {
    open: boolean,
    closeGenerator: () => void
}

export default function PasswordGenerator({ 
    open, 
    closeGenerator
}: PasswordGeneratorProps) {
    const [ nbChars, setNbChars ] = useState(12);
    const [ nbInteger, setNbInteger ] = useState(4);
    const [ nbSymbol, setNbSymbol] = useState(4);
    const [ generatedPassword, setGeneratedPassword ] = useState("");

    const handleGeneration = () => {
        let password = "";
        password += getRandomChar(DIGITS, nbInteger);
        password += getRandomChar(SPECIAL_CHAR, nbSymbol);
        password += getRandomChar(LOWERCASE_CHAR, nbChars / 2);
        password += getRandomChar(UPPERCASE_CHAR, nbChars / 2);

        setGeneratedPassword(shuffleString(password.split('')));
    };

    const handleCopy = async () => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(generatedPassword);
            handleClose();
        }
    };

    const handleClose = () => {
        setGeneratedPassword("");
        setNbChars(12);
        setNbInteger(4);
        setNbSymbol(4);
        closeGenerator();
    }

    const handleNbChars = (value: number) => {
        if (value < 12)
            setNbChars(12);
        else if (value > 36)
            setNbChars(36);
        else
            setNbChars(value);
    }

    const handleNbIntegers = (value: number) => {
        setNbInteger(value);
    }

    const handleNbSymbols = (value: number) => {
        setNbSymbol(value);
    }

    return (
        <Dialog 
            open={ open } 
            onClose={ handleClose }>
            <DialogTitle>
                Generate a new password
            </DialogTitle>

            <DialogContent>
                <Grid
                    container
                    spacing={{ xs: 4 }}>
                        <Grid item xs={ 2 }>
                            <AbcOutlined fontSize="large" />
                        </Grid>
                        <Grid item xs={ 8 }>
                            <Slider
                                defaultValue={ nbChars }
                                step={ 1 }
                                min={ 12 }
                                max={ 36 }
                                marks
                                onChange={ (e, v) => handleNbChars(v as number) } />
                        </Grid>
                        <Grid item xs={ 2 }>
                            <TextField 
                                type="number" 
                                variant="standard"
                                size="small"
                                disabled={ true }
                                inputProps={{ style: {textAlign: "center"} }} 
                                value={ nbChars } 
                                onChange={ (e) => handleNbChars(Number(e.target.value)) }/>
                        </Grid>

                        <Grid item xs={ 2 }>
                            <NumbersOutlined fontSize="large" />
                        </Grid>
                        <Grid item xs={ 8 }>
                            <Slider
                                defaultValue={ nbInteger }
                                step={ 1 }
                                min={ 4 }
                                max={ 12 }
                                marks
                                onChange={ (e, v) => handleNbIntegers(v as number) } />
                        </Grid>
                        <Grid item xs={ 2 }>
                            <TextField 
                                type="number" 
                                variant="standard"
                                size="small"
                                disabled={ true }
                                inputProps={{ style: {textAlign: "center"} }} 
                                value={ nbInteger } 
                                onChange={ (e) => handleNbIntegers(Number(e.target.value)) }/>
                        </Grid>

                        <Grid item xs={ 2 }>
                            <EmojiSymbolsOutlined fontSize="large" />
                        </Grid>
                        <Grid item xs={ 8 }>
                            <Slider
                                defaultValue={ nbSymbol }
                                step={ 1 }
                                min={ 4 }
                                max={ 12 }
                                marks
                                onChange={ (e, v) => handleNbSymbols(v as number) } />
                        </Grid>
                        <Grid item xs={ 2 }>
                            <TextField 
                                type="number" 
                                variant="standard"
                                size="small"
                                disabled={ true }
                                inputProps={{ style: {textAlign: "center"} }} 
                                value={ nbSymbol }
                                onChange={ (e) => handleNbSymbols(Number(e.target.value)) }/>
                        </Grid>
                </Grid>
                
                <TextField 
                    sx={{ mt: 4 }}
                    label={ generatedPassword ? `Password with ${nbChars} characters, ${nbInteger} numbers and ${nbSymbol} symbols` : '' }
                    fullWidth 
                    inputProps={{ style: {textAlign: "center"} }} 
                    value={ generatedPassword }/>
            </DialogContent>

            <DialogActions>
                <Button onClick={ handleGeneration }>Generate</Button>
                <Button onClick={ handleCopy }>Copy</Button>
                <Button onClick={ closeGenerator }>Close</Button>
            </DialogActions>
        </Dialog>
    );
}