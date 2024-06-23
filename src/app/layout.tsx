import type { Metadata } from "next";
import "@/assets/css/globals.css";

//Components
import { ClientProvider, RootProvider } from "@/components/providers";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Paradise Vocabulary",
  description: "Created by alimor.ir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ClientProvider>
          <RootProvider>{children}</RootProvider>
        </ClientProvider>
        <ToastContainer rtl />
      </body>
    </html>
  );
}
