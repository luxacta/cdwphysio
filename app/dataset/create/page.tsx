"use client";

import { useState } from "react";
import { Archive, ArrowUpRight, FileImage, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CreateDatasetPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    author: "",
    dataType: "",
    source: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        (f) => f.type === "application/zip" || f.type.startsWith("image/"),
      );
      setFiles((p) => [...p, ...newFiles]);
    }
  };
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        (f) => f.type === "application/zip" || f.type.startsWith("image/"),
      );
      setFiles((p) => [...p, ...newFiles]);
    }
  };
  const remove = (i: number) => setFiles((p) => p.filter((_, idx) => idx !== i));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.length) {
      toast.error("Upload at least one file.");
      return;
    }
    toast.success("Dataset Uploaded!", { description: "Your bone fracture dataset is under review.", duration: 6000 });
    setFormData({ title: "", description: "", keywords: "", author: "", dataType: "", source: "" });
    setFiles([]);
  };

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
            <Link href="/dataset" className="hover:text-cdw-primary">
              Datasets
            </Link>
            <Link href="/app/dataset/create" className="text-cdw-primary font-semibold">
              Create
            </Link>
          </nav>
        </div>
      </header>

      {/* Main + Sidebar */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-outfit font-medium mb-6">Create New Bone Fracture Dataset</h1>
        <Separator className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Form */}
          <section className="md:col-span-2 lg:col-span-3">
            <form onSubmit={submit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Tibia Fracture X-ray Dataset"
                  value={formData.title}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe fracture types, imaging modality, intended use..."
                  value={formData.description}
                  onChange={handleInput}
                  required
                />
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  name="keywords"
                  placeholder="tibia, x-ray, classification, fracture"
                  value={formData.keywords}
                  onChange={handleInput}
                />
              </div>

              {/* Author + Data Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author / Investigator</Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Your Name / Institution"
                    value={formData.author}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataType">Data Type</Label>
                  <Input
                    id="dataType"
                    name="dataType"
                    placeholder="e.g., X-ray (PNG)"
                    value={formData.dataType}
                    onChange={handleInput}
                    required
                  />
                </div>
              </div>

              {/* Source */}
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  name="source"
                  placeholder="Hospital, Online Repository, etc."
                  value={formData.source}
                  onChange={handleInput}
                />
              </div>

              {/* Drag-and-Drop Upload */}
              <div className="space-y-3">
                <Label>Upload Files</Label>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive ? "border-cdw-primary bg-cdw-primary/5" : "border-input bg-muted/50"}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}>
                  <Upload className="mx-auto h-12 w-12 text-cdw-primary mb-3" />
                  <p className="text-sm font-medium">Drop ZIP or images here</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports .zip, .png, .jpg, .jpeg (multiple files)
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".zip,image/*"
                    onChange={handleSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-4 inline-block px-5 py-2 bg-cdw-primary text-cdw-secondary-foreground rounded-md text-sm font-medium cursor-pointer hover:bg-cdw-primary/90 transition">
                    Choose Files
                  </label>
                </div>

                {/* File preview */}
                {files.length > 0 && (
                  <div className="space-y-2 max-h-64 overflow-y-auto p-3 bg-muted/30 rounded-lg">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-background rounded-md text-sm">
                        <div className="flex items-center gap-2">
                          {f.type === "application/zip" ? (
                            <Archive className="h-4 w-4 text-cdw-primary" />
                          ) : (
                            <FileImage className="h-4 w-4 text-cdw-primary" />
                          )}
                          <span className="font-medium">{f.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(f.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button size="icon" variant="ghost" onClick={() => remove(i)} className="h-6 w-6">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full bg-cdw-primary text-cdw-secondary-foreground text-lg py-6">
                Upload Dataset <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Upload Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2 text-muted-foreground">
                <p>• ZIP files are preferred for large datasets</p>
                <p>• Max 10 GB per upload</p>
                <p>• Images must be anonymized</p>
                <p>• Include README.txt for metadata</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["X-ray", "Tibia", "Classification", "AI", "MRI", "Pediatric"].map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
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
