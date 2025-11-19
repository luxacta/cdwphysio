"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Calendar, Eye, FileText, Image as ImageIcon, Tag, User } from "lucide-react";

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dataset: {
    title: string;
    description: string;
    author: string;
    category: string;
    publishedDate: string;
    dataType: string;
    source: string;
    images: number;
    size: string;
    citations: number;
  };
}

export function PreviewModal({ open, onOpenChange, dataset }: PreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-outfit">Dataset Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Title + meta */}
          <div>
            <h2 className="text-2xl font-medium">{dataset.title}</h2>
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
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="whitespace-pre-line">{dataset.description}</p>
          </div>

          <Separator />

          {/* Metadata */}
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
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
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

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
