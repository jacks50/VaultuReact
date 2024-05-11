"use client";

import { SessionContext, SessionContextData } from "@/context/useSessionContext";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

const LoginPage = dynamic(() => import('@/components/pages/login/LoginPage'), {ssr: false})
const PasswordListPage = dynamic(() => import('@/components/pages/password/PasswordListPage'), {ssr: false})

const customTheme = createTheme({palette: {
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
  const [ sessionContextData, setSessionContextData ] = useState<SessionContextData>();

  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth={ false } sx={{ width: '100%', height: '100%', backgroundColor: '#000' }} disableGutters>
        <CssBaseline/>

        <SessionContext.Provider value={{ sessionContextData, setSessionContextData }}>  
          { sessionContextData?.passwordList ? <PasswordListPage /> : <LoginPage /> }
        </SessionContext.Provider>
      </Container>
    </ThemeProvider>
  )
}
