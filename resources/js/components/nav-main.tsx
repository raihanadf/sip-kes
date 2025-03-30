import type React from "react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import type { NavGroup, NavItem } from "@/types"
import { Link, usePage } from "@inertiajs/react"
import { ChevronRight } from 'lucide-react'

export function NavMain({ items = [], groups = [] }: { items?: NavItem[]; groups?: NavGroup[] }) {
  const page = usePage()
  const currentUrl = page.url
  const { state, toggleSidebar } = useSidebar() // Get sidebar state and toggle function
  const isCollapsed = state === "collapsed"

  const isItemActive = (item: NavItem) => {
    return item.href === currentUrl
  }

  const isGroupActive = (group: NavGroup) => {
    return group.items.some((item) => isItemActive(item))
  }

  const isGroupExpanded = (group: NavGroup) => {
    if (isGroupActive(group)) return true

    const groupBasePath = group.items[0]?.href.split("/")[1]
    return groupBasePath && currentUrl.startsWith(`/${groupBasePath}`)
  }

  const commonTextStyles = "text-sm font-normal text-foreground"
  const commonActiveStyles = "bg-blue-500 text-white"

  const handleCollapsedGroupClick = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleSidebar()
  }

  return (
    <>
      {items.length > 0 && (
        <SidebarGroup className="px-2 py-0 mt-12">
          <SidebarMenu>
            {items.map((item) => {
              const isActive = isItemActive(item)

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={{ children: item.title }}
                    className={cn(
                      commonTextStyles,
                      isActive && commonActiveStyles,
                      "h-9 px-2", // Ensure consistent height and padding
                      isCollapsed && "justify-center px-0", // Center icon when collapsed
                    )}
                  >
                    <Link href={item.href} prefetch className="flex items-center">
                      {item.icon && <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />}
                      <span className={cn(isCollapsed && "sr-only")}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      )}

      {groups.map((group) => {
        const groupActive = isGroupActive(group)

        if (isCollapsed) {
          return (
            <SidebarGroup key={group.title} className="px-2 py-0 mt-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={groupActive}
                    tooltip={{ children: group.title }}
                    className={cn(
                      commonTextStyles,
                      groupActive && commonActiveStyles,
                      "h-9 justify-center px-0",
                    )}
                    onClick={handleCollapsedGroupClick}
                  >
                    {group.icon && <group.icon className="h-4 w-4" />}
                    <span className="sr-only">{group.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          )
        }

        return (
          <SidebarGroup key={group.title} className="px-2 py-0 mt-2">
            <Collapsible className="group/collapsible w-full" defaultOpen={!!isGroupExpanded(group)}>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel
                  className={cn(
                    commonTextStyles,
                    "cursor-pointer flex items-center justify-between",
                    "rounded-md h-9 px-2 mr-2", // Added mr-2 as requested
                    groupActive && commonActiveStyles,
                  )}
                >
                  <div className="flex items-center">
                    {group.icon && <group.icon className="h-4 w-4 mr-2" />}
                    <span>{group.title}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu className={cn(
                  "ml-2 border-l border-gray-200 pl-2 mt-1",
                  // Apply blue background to the entire submenu when group is active
                  groupActive && "bg-blue-100 rounded-md py-1"
                )}>
                  {group.items.map((item) => {
                    const isActive = isItemActive(item)

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={cn(
                            commonTextStyles,
                            // Always apply blue styling to items in active groups
                            groupActive && !isActive && "text-blue-700",
                            isActive && commonActiveStyles,
                            "h-9 px-2 rounded-md", // Ensure consistent height and padding
                          )}
                          tooltip={{ children: item.title }}
                        >
                          <Link href={item.href} prefetch className="flex items-center">
                            {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )
      })}
    </>
  )
}
