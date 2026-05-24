"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { FooterWrapper } from "./footer-wrapper";
import VideoTransition from "./video-transition";
import AdminNav from "./adminNav";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTechHuntPage = pathname === "/tech-hunt";
  const isStandalonePage = pathname === "/phoenix" || pathname === "/apex";

  if (isStandalonePage) {
    return <>{children}</>;
  }

  return (
    <VideoTransition>
      {!isTechHuntPage ? <Navigation /> : null}
      {!isTechHuntPage ? <AdminNav /> : null}
      <main className="min-h-screen">{children}</main>
      {!isTechHuntPage ? <FooterWrapper /> : null}
    </VideoTransition>
  );
}
