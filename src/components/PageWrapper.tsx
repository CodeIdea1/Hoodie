"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageTransitionIn } from "@/animations/pageTransitions";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    pageTransitionIn();
  }, [pathname]);

  return <>{children}</>;
}