import "./globals.css";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
