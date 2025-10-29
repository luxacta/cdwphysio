import { ArrowUpRight, Clock, Headset, Mail, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <header className="relative top-0 h-full w-full flex flex-col before:bg-[url('/assets/img/banner-bg.jpg')] before:bg-no-repeat before:bg-center before:bg-cover before:absolute before:inset-0 before:top-10 before:-z-10 before:opacity-12">
      {/* Header Top */}
      <div className="relative header-top">
        <div className="flex items-center justify-center md:justify-between py-4 md:py-2.5 mx-4 sm:container sm:mx-auto">
          <div className="hidden md:flex items-center gap-x-10 text-white">
            <span className="inline-flex items-center gap-x-2">
              <Headset size="15" className="stroke-3 stroke-cdw-secondary" />
              Help Line: +234-3572-2899
            </span>
            <span className="hidden lg:inline-flex items-center gap-x-2">
              <Clock size="15" className="stroke-3 stroke-cdw-secondary" />
              Open Hours: Mon - Fri 8.00 am - 6.00 pm
            </span>
          </div>
          <div className="flex h-5 justify-between items-center space-x-3">
            <div className="hidden sm:flex items-center gap-x-2">
              <Mail size="15" className="stroke-3 stroke-cdw-secondary" />
              <Link href="mailto:info@example.com" className="hover:text-cdw-primary transition-all">
                info@example.com
              </Link>
            </div>
            <Separator orientation="vertical" className="hidden sm:block" />
            <Link
              href="/app/dataset/create"
              className="hover:text-cdw-primary transition-all flex items-center gap-x-2">
              <SquarePen size="15" className="stroke-3 stroke-cdw-secondary" />
              Create a Dataset
            </Link>
            <Separator orientation="vertical" />
            <Link
              href="https://github.com/luxacta/cdwphysio.git"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 font-inconsolata bg-cdw-secondary text-cdw-secondary-foreground px-2 py-2 rounded border shadow-sm">
              <FaGithub size={16} />
              <span className="font-bold md:hidden">Source Code</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Header Nav */}
      <div className="header-nav">
        <Link href="/" className="w-32 block space-y-0.5">
          <div className="font-black font-kode-mono text-2xl">
            <span className="text-cdw-primary">CDW</span>Physio
          </div>
          <Separator className="bg-cdw-secondary !h-[1.5px] dark:bg-white" />
          <div className="w-full font-bold text-center text-md text-shadow-2xs text-cdw-secondary">Data Warehouse</div>
          <Separator className="bg-cdw-secondary !h-[1.5px] dark:bg-white" />
        </Link>
      </div>

      <div className=" px-4 pt-6 sm:container sm:mx-auto box-border relative flex flex-wrap w-full space-y-6 flex-1 min-h-[500px] items-center">
        <div className="w-full md:w-1/2 max-w-xl">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl leading-tight font-medium mb-3 font-outfit text--accent-foreground">
            Unleash Your Research -<br /> Bone Fracture Data Warehouse
          </h1>
          <p className="leading-normal text-muted-foreground">
            CDWPhysio is a free, secure, cloud-based repository designed for storing and sharing bone fracture research
            data. It ensures your datasets are easily accessible, shareable, and citable, supporting collaboration and
            reproducibility in bone fracture studies, no matter where you are.
          </p>
          <div className="mt-8 space-x-4 space-y-4">
            <Button
              size="lg"
              className="
                rounded bg-cdw-primary !text-cdw-secondary
                hover:bg-cdw-secondary hover:!text-cdw-secondary-foreground
                text-sembold transition-all cursor-pointer"
              asChild>
              <Link href="/dataset/create">
                {" "}
                {/* Protected */}
                Create a Dataset <ArrowUpRight />
              </Link>
            </Button>
            <Button
              size="lg"
              className="rounded border-2 bg-transparent
              hover:bg-accent hover:text-accent-foreground
              dark:bg-transparent dark:border-white dark:hover:bg-input/50
              border-primary cursor-pointer"
              variant="outline"
              asChild>
              <Link href="/dataset">
                {" "}
                {/* Protected */}
                Data Warehouse <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative max-w-xl self-end">
          <Image
            src="/assets/img/banner-img.png"
            alt="Image"
            width="400"
            height="400"
            className="max-w-60 md:max-w-[31.21vw] lg:max-w-md"
          />
          <Image
            src="/assets/img/banner-2-img-2.png"
            alt="Image"
            width="400"
            height="400"
            className="absolute md:hidden xl:block bottom-0 left-3/5 max-w-60 md:max-w-[31.21vw] lg:max-w-md"
          />
        </div>

        {/*<div className="col-xxl-5 col-xl-4 col-lg-5">*/}
        {/*  <Image*/}
        {/*    src="/assets/img/banner-img.png"*/}
        {/*    alt="Image"*/}
        {/*    width="400"*/}
        {/*    height="400"*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </header>
  );
}
