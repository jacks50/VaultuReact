import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VaultuReact",
  description: "Manage your passwords from the Vaulture Android app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html style={{ width: 'auto', height: '100%' }}>
      <body style={{ width: 'auto', height: '100%' }}>
        {children}
      </body>
    </html>
  );
}
