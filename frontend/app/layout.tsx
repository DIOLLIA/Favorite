// In Next.js, you can use a special layout.tsx file to create UI that is shared between multiple pages.

import '@/app/ui/global.css'
import {inter} from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
