import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Logo() {
  return (
    <Link href="/" className="w-32 block space-y-0.5">
      <div className="font-black font-kode-mono text-2xl">
        <span className="text-cdw-primary">CDW</span>Physio
      </div>
      <Separator className="bg-cdw-secondary !h-[1.5px] dark:bg-white" />
      <div className="w-full font-bold text-center text-md text-shadow-2xs text-cdw-secondary">Data Warehouse</div>
      <Separator className="bg-cdw-secondary !h-[1.5px] dark:bg-white" />
    </Link>
  );
}
