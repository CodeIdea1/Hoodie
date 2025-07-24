import "./../styles/globals.css";
import Header from '../components/Header';
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";

import { Nova_Square } from "next/font/google";

const novaSquare = Nova_Square({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-nova",
});



export const metadata = {
  title: "HOODIE",
  description: "HOODIE Store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={novaSquare.variable}>
      <body>
        <PageWrapper>
          <Header />
          {children}
          <Footer />
        </PageWrapper>
      </body>
    </html>
  );
}


