import type { Metadata } from "next";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
    <html className="h-full" style={{ backgroundColor: "#212121" }}>
        <body className="h-full" style={{ backgroundColor: "#212121" }}>
          {children}
        </body>
    </html>
  );
}
