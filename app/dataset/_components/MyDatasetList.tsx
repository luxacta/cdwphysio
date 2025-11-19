"use client";

import { useEffect, useState } from "react";
import { Calendar, Download, Eye, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "sonner";

import datasets from "../_data/datasets.json";

type Dataset = (typeof datasets)[0];

export function MyDatasetList() {
  const [myDatasets, setMyDatasets] = useState<Dataset[]>([]);

  // In a real app you would get the logged-in user ID from auth.
  const currentUser = "John Doe"; // <-- replace with real auth

  useEffect(() => {
    const mine = datasets.filter((d) => d.author === currentUser);
    setMyDatasets(mine);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this dataset?")) return;

    try {
      await fetch(`/api/datasets/${id}`, { method: "DELETE" });
      setMyDatasets((prev) => prev.filter((d) => d.id !== id));
      toast.success("Dataset deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      {myDatasets.length === 0 ? (
        <p className="text-center text-muted-foreground">You have not uploaded any datasets yet.</p>
      ) : (
        myDatasets.map((ds) => (
          <Card key={ds.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-lg font-outfit">{ds.title}</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(ds.publishedDate).toLocaleDateString()} | by {ds.author}
                  </CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" asChild>
                    <Link href={`/dataset/${ds.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(ds.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm line-clamp-2">{ds.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary">{ds.category}</Badge>
                <Badge variant="outline">{ds.dataType}</Badge>
                <Badge variant="outline">{ds.images} images</Badge>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href={`/dataset/${ds.id}`}>
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View
                </Link>
              </Button>
              <Button size="sm" className="flex-1 bg-cdw-primary text-cdw-secondary-foreground">
                <Download className="h-3.5 w-3.5 mr-1" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
