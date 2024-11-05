import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./component/navbar";
import Footer from "./component/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Next Blog App",
  description: "A simple blog app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body
          style={{ backgroundColor: "#1e2134" }}
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar/>
          {children}
          <Footer/>
        </body>
    </html>
  );
}
