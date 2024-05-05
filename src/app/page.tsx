"use client";

import { SessionContext, SessionContextData } from "@/context/useSessionContext";
import { Backdrop, CircularProgress, Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

const LoginPage = dynamic(() => import('@/components/pages/login/LoginPage'), {ssr: false})
const PasswordListPage = dynamic(() => import('@/components/pages/password/PasswordListPage'), {ssr: false})
const customTheme = createTheme();

function Copyright(props: any) {

}

export default function Page() {
  const [isLoading, setLoading] = useState(false);
  const [ sessionContextData, setSessionContextData ] = useState<SessionContextData>();

  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth={ false } disableGutters>
        <CssBaseline/>
        
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={ isLoading }>
            <CircularProgress color="inherit" />
        </Backdrop>

        <SessionContext.Provider value={{ sessionContextData, setSessionContextData }}>
          {sessionContextData?.passwordList && sessionContextData.passwordList.size > 0 ? 
            <PasswordListPage setLoading={setLoading} /> : 
            <LoginPage setLoading={setLoading} />}
        </SessionContext.Provider>
      </Container>
    </ThemeProvider>
  )
}
