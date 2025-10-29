"use client";

import { useState } from "react";
import { BarChart3, Calendar, Download, Eye, Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { Logo } from "@/components/logo";

// Import JSON
import datasets from "@/data/datasets.json";

const ITEMS_PER_PAGE = 5;

// Sidebar helpers
const recentUploads = [...datasets]
  .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
  .slice(0, 3);

const categories = [...new Set(datasets.map((d) => d.category))];

const stats = {
  totalDatasets: datasets.length,
  totalImages: datasets.reduce((a, b) => a + b.images, 0),
  totalCitations: datasets.reduce((a, b) => a + b.citations, 0),
};

export default function DatasetPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDatasets = datasets.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredDatasets.length / ITEMS_PER_PAGE);
  const paginatedData = filteredDatasets.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <nav className="flex space-x-4">
            <Link href="/public" className="text-foreground hover:text-cdw-primary">
              Home
            </Link>
            <Link href="/dataset" className="text-cdw-primary font-semibold">
              Datasets
            </Link>
            <Link href="/dataset/create" className="hover:text-cdw-primary">
              Create
            </Link>
          </nav>
        </div>
      </header>

      {/* Main + Sidebar */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-outfit font-medium">Bone Fracture Data Warehouse</h1>
          <Link href="/dataset/create">
            <Button className="bg-cdw-primary text-cdw-secondary-foreground">Create Dataset</Button>
          </Link>
        </div>

        <Separator className="mb-6" />

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, author, description, or category..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Showing {paginatedData.length} of {filteredDatasets.length} datasets
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <section className="md:col-span-2 lg:col-span-3 space-y-6">
            {paginatedData.map((ds) => (
              <Card key={ds.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start gap-3">
                    <CardTitle className="text-lg font-outfit leading-tight">{ds.title}</CardTitle>
                    <Badge variant="secondary">{ds.category}</Badge>
                  </div>
                  <CardDescription className="text-xs flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(ds.publishedDate).toLocaleDateString()} | by {ds.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm leading-relaxed">{ds.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {ds.images} images
                    </span>
                    <span>•</span>
                    <span>{ds.size}</span>
                    <span>•</span>
                    <span>{ds.citations} citations</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/dataset/${ds.id}`}>
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View Details
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1 bg-cdw-primary text-cdw-secondary-foreground">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4" />
                  Recent Uploads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentUploads.map((u) => (
                  <Link key={u.id} href={`/dataset/${u.id}`} className="block p-2 rounded hover:bg-accent transition">
                    <p className="font-medium text-sm line-clamp-2">{u.title}</p>
                    <p className="text-xs text-muted-foreground">{new Date(u.publishedDate).toLocaleDateString()}</p>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Tag className="h-4 w-4" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Badge
                    key={c}
                    variant="outline"
                    className="cursor-pointer hover:bg-cdw-primary hover:text-cdw-primary-foreground transition text-xs"
                    onClick={() => {
                      setSearchTerm(c);
                      setCurrentPage(1);
                    }}>
                    {c}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-4 w-4" />
                  Repository Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Datasets</span>
                  <span className="font-medium">{stats.totalDatasets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Images</span>
                  <span className="font-medium">{stats.totalImages.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Citations</span>
                  <span className="font-medium">{stats.totalCitations}</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage((c) => c - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(p);
                      }}
                      isActive={currentPage === p}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage((c) => c + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
    </div>
  );
}
