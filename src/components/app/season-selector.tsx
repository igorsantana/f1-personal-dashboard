import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useState } from "react";

export default function SeasonSelector() {
  const [currentYear, setCurrentYear] = useState<number>(2024);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          Season {currentYear}
          <ChevronDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
        <DropdownMenuItem onClick={() => setCurrentYear(2023)}>
          <span>Season {2023}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrentYear(2024)}>
          <span>Season {2024}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
