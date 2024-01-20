import { Inter } from "next/font/google";
import "./globals.css";

import GlobalState from '@/context';


export const metadata = {
  title: "MedCare",
  description: "Generated for helping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalState>{children}</GlobalState>
      </body>
    </html>
  );
}
