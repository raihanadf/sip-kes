import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { NavGroup, NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

export function NavMain({ items = [], groups = [] }: { items?: NavItem[]; groups?: NavGroup[] }) {
    const page = usePage();
    const currentUrl = page.url;
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    const isItemActive = (item: NavItem) => {
        return item.href === currentUrl;
    };

    const isGroupActive = (group: NavGroup) => {
        return group.items.some((item) => isItemActive(item));
    };

    const isGroupExpanded = (group: NavGroup) => {
        if (isGroupActive(group)) return true;

        const groupBasePath = group.items[0]?.href.split('/')[1];
        return groupBasePath && currentUrl.startsWith(`/${groupBasePath}`);
    };

    const commonTextStyles = 'text-sm font-normal text-foreground';
    const commonActiveStyles = 'bg-primary-500 text-white';

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = isItemActive(item);

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                                className={cn(commonTextStyles, isActive && commonActiveStyles, 'h-9 px-2', isCollapsed && 'justify-center px-0')}
                            >
                                <Link href={item.href} prefetch className="flex items-center">
                                    {item.icon && <item.icon className={cn('h-4 w-4', !isCollapsed && 'mr-2')} />}
                                    <span className={cn(isCollapsed && 'sr-only')}>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}

                {groups.map((group) => {
                    const groupActive = isGroupActive(group);

                    return (
                        <Collapsible className="group/collapsible w-full" defaultOpen={!!isGroupExpanded(group)}>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={{ children: group.title }}
                                        isActive={groupActive}
                                        className={cn(
                                            commonTextStyles,
                                            'flex cursor-pointer items-center justify-between',
                                            'mr-2 h-9 rounded-md px-2',
                                            groupActive && commonActiveStyles,
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <div className="flex items-center gap-2">
                                                {group.icon && <group.icon className={cn('h-4 w-4', !isCollapsed && 'mr-2')} />}
                                                <span className={cn(isCollapsed && 'sr-only')}>{group.title}</span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </div>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {group.items.map((item) => {
                                            const isActive = isItemActive(item);

                                            return (
                                                <SidebarMenuSubItem key={item.title}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={isActive}
                                                        className={cn(
                                                            commonTextStyles,
                                                            groupActive && !isActive && 'text-primary-700',
                                                            isActive && commonActiveStyles,
                                                            'h-9 rounded-md px-2',
                                                        )}
                                                        tooltip={{ children: item.title }}
                                                    >
                                                        <Link href={item.href} prefetch className="flex items-center">
                                                            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
