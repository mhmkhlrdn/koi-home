// @ts-nocheck

import { NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import * as icons from 'lucide-react';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';
import MenuItem from './ui/MenuItem';

export default function Sidebar() {
    const { menus = [] } = usePage().props as {
        menus?: { id: number; title: string; url: string; icon_tag: string; children?: any[] }[];
    };

    const navItems: NavItem[] = menus
        .map((menu) => ({
            id: menu.id,
            title: menu.title,
            url: '/kh-admin' + menu.url,
            icon: (icons as any)[menu.icon_tag] || icons.LayoutGrid,
            children:
                menu.children
                    ?.map((child) => ({
                        id: child.id,
                        title: child.title,
                        url: '/kh-admin' + menu.url + child.url,
                        icon: (icons as any)[child.icon_tag] || icons.LayoutGrid,
                        children: [],
                    }))
                    .sort((a, b) => a.title.localeCompare(b.title)) || [],
        }))
        .sort((a, b) => a.title.localeCompare(b.title));

    return (
        <aside className="sticky top-0 flex h-screen w-64 flex-col bg-gray-900 p-4 text-white">
            <SidebarHeader />
            <nav className="mt-4 flex-1 overflow-y-auto">
                {navItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                ))}
            </nav>
            <SidebarFooter />
        </aside>
    );
}

// Recursive component to handle parent-child menus
