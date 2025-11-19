import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "datasets.json");

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const data = fs.readFileSync(filePath, "utf-8");
  const datasets = JSON.parse(data);
  const filtered = datasets.filter((d: any) => d.id !== params.id);
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
  return NextResponse.json({ success: true });
}
