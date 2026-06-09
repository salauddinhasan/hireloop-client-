// src/app/layout.js
import "./globals.css";
export const metadata = {
  title: "HireLoop BD",
  description: "Premium Job Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
