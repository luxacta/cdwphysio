"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function DatasetLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/public", label: "Home" },
    { href: "/dataset", label: "Datasets" },
    { href: "/dataset/create", label: "Create" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <nav className="flex space-x-4">
            {navLinks.map(({ href, label }) => {
              let activeClass = "hover:text-cdw-primary";
              if (label === "Home" && pathname === href) {
                activeClass = "text-cdw-primary font-semibold";
              } else if (label === "Datasets" && pathname.startsWith("/dataset") && !pathname.endsWith("/create")) {
                activeClass = "text-cdw-primary font-semibold";
              } else if (label === "Create" && pathname.endsWith("/create")) {
                activeClass = "text-cdw-primary font-semibold";
              }
              return (
                <Link key={href} href={href} className={`text-foreground ${activeClass}`}>
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
