import { Inter , Poppins , Mulish , Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider  from "@/components/AuthProvider"
import Navbar from "@/components/navBar/Navbar";
import Footer from "@/components/footer/footer";

const mulish = Mulish({subsets : ["latin"]}) 
const poppins = Poppins({subsets : ["latin"], weight:"400" });

const playfair = Playfair_Display({subsets : ["latin"]}) 
const inter = Inter({
  subsets: ['latin'], 
  display: 'swap',
});

export const metadata= {
  title : "WatchStore",
  description : "Ecommerce Store that sells Watches"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={poppins.className}  suppressContentEditableWarning suppressHydrationWarning>
        <AuthProvider>
          <Navbar/>
          {children}
          <Footer/>
          </AuthProvider>
      </body>
    </html>
  );
}
