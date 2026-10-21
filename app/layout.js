import "./globals.css";

export const metadata = {
  title: "AuthFlow — Login & Registration",
  description: "A modern, premium login and registration portal with email/password and Google sign-in. Built with Next.js and Supabase.",
  keywords: ["login", "registration", "authentication", "supabase", "nextjs"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-animated" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
