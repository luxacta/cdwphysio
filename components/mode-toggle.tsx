"use client";

import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const {theme, setTheme} = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
            <Moon
              className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mr-2">
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={theme === "light" ? "bg-accent font-semibold" : ""}
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={theme === "dark" ? "bg-accent font-semibold" : ""}
          >
            Dark
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className={theme === "system" ? "bg-accent font-semibold" : ""}
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}