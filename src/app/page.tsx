"use client";

import { AppProvider } from "@/context/AppContext";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#b71c1c',
    },
  },
});

customTheme.typography.h1 = {
  fontSize: '2.4rem',
  '@media (min-width:600px)': {
    fontSize: '2.8rem',
  },
  [customTheme.breakpoints.up('md')]: {
    fontSize: '3.6rem',
  },
}

function Copyright(props: any) {

}

export default function Page() {
  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth={false} sx={{ width: '100%', height: '100%', backgroundColor: '#000' }} disableGutters>
        <CssBaseline />

        <AppProvider/>

      </Container>
    </ThemeProvider>
  );
}
