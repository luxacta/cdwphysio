// "use client";
//
// import {notFound, useParams} from "next/navigation";
// import {ArrowLeft, BarChart3, Calendar, Download, Eye, FileText, Image, Tag, User} from "lucide-react";
// import {Button} from "@/components/ui/button";
// import {Badge} from "@/components/ui/badge";
// import {Separator} from "@/components/ui/separator";
// import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
// import Link from "next/link";
// import {Logo} from "@/components/logo";
//
// // Import JSON
// import datasets from "@/data/datasets.json";
//
// export default function DatasetDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const dataset = datasets.find(d => d.id === id);
//
//   if (!dataset) notFound();
//
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="bg-background border-b">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Logo />
//           <nav className="flex space-x-4">
//             <Link href="/" className="text-foreground hover:text-cdw-primary">Home</Link>
//             <Link href="/dataset" className="hover:text-cdw-primary">Datasets</Link>
//             <Link href="/dataset/create" className="hover:text-cdw-primary">Create</Link>
//           </nav>
//         </div>
//       </header>
//
//       {/* Detail Content */}
//       <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
//         <Link href="/dataset" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cdw-primary mb-6">
//           <ArrowLeft className="h-4 w-4" /> Back to Datasets
//         </Link>
//
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Left – Main Info */}
//           <section className="md:col-span-2 space-y-6">
//             <div>
//               <h1 className="text-3xl font-outfit font-medium">{dataset.title}</h1>
//               <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
//                 <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(dataset.publishedDate).toLocaleDateString()}</span>
//                 <span className="flex items-center gap-1"><User className="h-4 w-4" />{dataset.author}</span>
//                 <Badge variant="secondary">{dataset.category}</Badge>
//               </div>
//             </div>
//
//             <Separator />
//
//             <div className="prose prose-sm max-w-none">
//               <h2 className="text-xl font-semibold mb-2">Description</h2>
//               <p className="whitespace-pre-line">{dataset.description}</p>
//             </div>
//
//             <Separator />
//
//             {/* Metadata Table */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//               <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /><strong>Data Type:</strong> {dataset.dataType}</div>
//               <div className="flex items-center gap-2"><Tag className="h-4 w-4 text-muted-foreground" /><strong>Source:</strong> {dataset.source}</div>
//               <div className="flex items-center gap-2"><Image className="h-4 w-4 text-muted-foreground" /><strong>Images:</strong> {dataset.images.toLocaleString()}</div>
//               <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-muted-foreground" /><strong>Size:</strong> {dataset.size}</div>
//               <div className="flex items-center gap-2"><BarChart3 className="h-4 w-4 text-muted-foreground" /><strong>Citations:</strong> {dataset.citations}</div>
//             </div>
//
//             <Separator />
//
//             {/* Action Buttons */}
//             <div className="flex gap-3">
//               <Button className="flex-1 bg-cdw-primary text-cdw-secondary-foreground">
//                 <Download className="h-4 w-4 mr-2" /> Download Dataset
//               </Button>
//               <Button variant="outline" className="flex-1">
//                 <Eye className="h-4 w-4 mr-2" /> View Sample Images
//               </Button>
//             </div>
//           </section>
//
//           {/* Right – Quick Stats Sidebar */}
//           <aside className="space-y-6">
//             <Card>
//               <CardHeader className="pb-3">
//                 <CardTitle className="flex items-center gap-2 text-base"><BarChart3 className="h-4 w-4" /> Quick Stats</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3 text-sm">
//                 <div className="flex justify-between"><span className="text-muted-foreground">Images</span><span className="font-medium">{dataset.images.toLocaleString()}</span></div>
//                 <div className="flex justify-between"><span className="text-muted-foreground">File Size</span><span className="font-medium">{dataset.size}</span></div>
//                 <div className="flex justify-between"><span className="text-muted-foreground">Citations</span><span className="font-medium">{dataset.citations}</span></div>
//                 <div className="flex justify-between"><span className="text-muted-foreground">Published</span><span className="font-medium">{new Date(dataset.publishedDate).toLocaleDateString()}</span></div>
//               </CardContent>
//             </Card>
//
//             <Card>
//               <CardHeader className="pb-3">
//                 <CardTitle className="flex items-center gap-2 text-base"><Tag className="h-4 w-4" /> Related Tags</CardTitle>
//               </CardHeader>
//               <CardContent className="flex flex-wrap gap-2">
//                 {[...new Set([dataset.category, ...dataset.dataType.split(/[\s/]/)])].map((t, i) => (
//                   <Badge key={i} variant="outline" className="text-xs">{t}</Badge>
//                 ))}
//               </CardContent>
//             </Card>
//           </aside>
//         </div>
//       </main>
//     </div>
//   );
// }

// app/dataset/[id]/page.tsx
"use client";

import { notFound, useParams } from "next/navigation";
import { ArrowLeft, BarChart3, Calendar, Download, Eye, FileText, Image, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Logo } from "@/components/logo";

// Import the same JSON file used on the list page
import datasets from "@/data/datasets.json";

export default function DatasetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dataset = datasets.find((d) => d.id === id);

  if (!dataset) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      {/* ───── Header ───── */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <nav className="flex space-x-4">
            <Link href="/public" className="text-foreground hover:text-cdw-primary">
              Home
            </Link>
            <Link href="/dataset" className="hover:text-cdw-primary">
              Datasets
            </Link>
            <Link href="/app/dataset/create" className="hover:text-cdw-primary">
              Create
            </Link>
          </nav>
        </div>
      </header>

      {/* ───── Main Content ───── */}
      {/*  SAME CONTAINER & GRID as the list page → full width on mobile, 4-column on lg */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back link */}
        <Link
          href="/dataset"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cdw-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Datasets
        </Link>

        {/* Grid – exactly the same as on /dataset */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* ───── LEFT – Main info (2/3 of width on md, 3/4 on lg) ───── */}
          <section className="md:col-span-2 lg:col-span-3 space-y-6">
            {/* Title + meta */}
            <div>
              <h1 className="text-3xl font-outfit font-medium">{dataset.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(dataset.publishedDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {dataset.author}
                </span>
                <Badge variant="secondary">{dataset.category}</Badge>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="whitespace-pre-line">{dataset.description}</p>
            </div>

            <Separator />

            {/* Metadata table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <strong>Data Type:</strong> {dataset.dataType}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <strong>Source:</strong> {dataset.source}
              </div>
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4 text-muted-foreground" />
                <strong>Images:</strong> {dataset.images.toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <strong>Size:</strong> {dataset.size}
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <strong>Citations:</strong> {dataset.citations}
              </div>
            </div>

            <Separator />

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-cdw-primary text-cdw-secondary-foreground">
                <Download className="h-4 w-4 mr-2" /> Download Dataset
              </Button>
              <Button variant="outline" className="flex-1">
                <Eye className="h-4 w-4 mr-2" /> View Sample Images
              </Button>
            </div>
          </section>

          {/* ───── RIGHT – Sidebar (same as list page) ───── */}
          <aside className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-4 w-4" /> Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Images</span>
                  <span className="font-medium">{dataset.images.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">File Size</span>
                  <span className="font-medium">{dataset.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Citations</span>
                  <span className="font-medium">{dataset.citations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Published</span>
                  <span className="font-medium">{new Date(dataset.publishedDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Related Tags */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Tag className="h-4 w-4" /> Related Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[...new Set([dataset.category, ...dataset.dataType.split(/[\s/]/)])].map((t, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
