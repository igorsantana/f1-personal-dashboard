import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useMeetings } from "@/hooks/use-meetings";
import Meeting from "@/type/Meeting";
import FlagService from "@/services/FlagService";
import {
  useFormulaContext,
  useFormulaDispatchContext,
} from "@/hooks/use-formula";

export function AppSidebar() {
  const state = useFormulaContext();
  const flagSvc = FlagService();
  const years: number[] = [2023, 2024];
  const dispatch = useFormulaDispatchContext();
  const { meetings, getMeetings } = useMeetings();

  const updateYear = (value: number) => {
    dispatch({ type: "SEASON_CHANGED", value });
  };

  const selectedMeeting = (value: Meeting) => {
    dispatch({ type: "MEETING_SELECTED", value });
  };

  useEffect(() => {
    getMeetings(state.season);
  }, [getMeetings, state.season]);

  return (
    <Sidebar>
      <SidebarHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              Season {state.season}
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
            {years.map((year: number) => (
              <DropdownMenuItem onClick={() => updateYear(year)} key={year}>
                <span>Season {year}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Races
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarMenu>
                {meetings.map((meeting: Meeting) => (
                  <SidebarMenuItem key={meeting.meeting_name}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => selectedMeeting(meeting)}
                    >
                      <a>
                        <span className="flex gap-2 align-middle	">
                          <span>{flagSvc(meeting.country_code)}</span>
                          <strong className="">{meeting.meeting_name}</strong>
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
