import "./../styles/globals.css";
import Header from '../components/Header';
import Footer from "@/components/Footer";

import { Nova_Square } from "next/font/google";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}


