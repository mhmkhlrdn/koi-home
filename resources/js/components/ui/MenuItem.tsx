// @ts-nocheck

import { NavItem } from "@/types";
import { usePage, Link } from "@inertiajs/react";
import { icons } from "lucide-react";
import { useState, useEffect } from "react";
function MenuItem({ item }: { item: NavItem }) {
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const storedState = localStorage.getItem('openMenus');
        if (storedState) {
            setOpenMenus(JSON.parse(storedState));
        }  
    }, []);

    const isOpen = openMenus[item.title] || false;
    const isActive = usePage().url.includes(`${item.url}`) ? 'bg-gray-700 ' : '';
    // Toggle menu open state and store in localStorage
    const toggleMenu = (title: string) => {
        setOpenMenus((prev) => {
            const newState = { ...prev, [title]: !prev[title] };
            localStorage.setItem('openMenus', JSON.stringify(newState)); // Persist state
            return newState;
        });
    };

            return (
    <div>
            <div className={`flex items-center justify-between rounded hover:bg-gray-700 ${isActive}`}>
                <Link href={item.url} className="flex w-full items-center  p-2 ">
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.title}
                </Link>
                {item.children.length > 0 && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent navigation
                            toggleMenu(item.title);
                        }}
                        className="ml-2 rounded p-1 hover:bg-gray-600"
                    >
                        {isOpen ? <icons.ChevronDown /> : <icons.ChevronRight />}
                    </button>
                )}
            </div>

            {/* Render Submenu */}
            {isOpen && item.children.length > 0 && (
                <div className="ml-4 border-l border-gray-700 p-2">
                    {item.children.map((child) => (
                        <MenuItem key={child.id} item={child} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MenuItem;
