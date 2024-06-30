import type { Metadata } from "next";
import "@/assets/css/globals.css";

//Components
import { ClientProvider, RootProvider } from "@/components/providers";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Paradise Vocabulary",
  description: "Powered By Paradise Code Created By alimor.ir",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-100">
      <body>
        <ClientProvider>
          <RootProvider>{children}</RootProvider>
        </ClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
