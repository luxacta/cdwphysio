import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "datasets.json");

export async function POST(request: Request) {
  const newDataset = await request.json();

  const data = fs.readFileSync(filePath, "utf-8");
  const datasets = JSON.parse(data);

  datasets.push(newDataset);

  fs.writeFileSync(filePath, JSON.stringify(datasets, null, 2));

  return NextResponse.json({ success: true });
}
