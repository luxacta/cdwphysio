"use client";

import { ReactNode } from "react";

interface DatasetGridProps {
  mainContent: ReactNode;
  sidebar: ReactNode;
  gap?: 6 | 8;
}

export function DatasetGrid({ mainContent, sidebar, gap = 6 }: DatasetGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-${gap}`}>
      <section className="md:col-span-2 lg:col-span-3 space-y-6">{mainContent}</section>
      <aside className="space-y-6">{sidebar}</aside>
    </div>
  );
}
