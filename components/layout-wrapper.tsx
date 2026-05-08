"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { FooterWrapper } from "./footer-wrapper";
import VideoTransition from "./video-transition";
import AdminNav from "./adminNav";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPhoenixPage = pathname === "/phoenix";

  if (isPhoenixPage) {
    return <>{children}</>;
  }

  return (
    <VideoTransition>
      <Navigation />
      <AdminNav />
      <main className="min-h-screen">{children}</main>
      <FooterWrapper />
    </VideoTransition>
  );
}
