import { router, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronUp, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

const SidebarFooter = () => {
    const { auth } = usePage().props as { auth?: { user?: { name: string; email: string; role: string } } };
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout'); // Laravel handles logout via POST request
    };

    return (
        <div className="relative mt-auto flex flex-col rounded-md bg-gray-800 p-4">
            {/* User Info */}
            <div className="flex cursor-pointer items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    <span className="block text-sm">{auth?.user?.name}</span>
                    <span className="block text-sm text-gray-400 uppercase">{auth?.user?.role}</span>
                </div>
                {/* Toggle Button */}
                <button className="ml-2 text-gray-300 hover:text-white">{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</button>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute bottom-14 left-0 w-full rounded-md bg-gray-700 shadow-lg">
                    <button className="flex w-full items-center px-4 py-2 text-white hover:bg-gray-600" onClick={() => alert('Go to settings')}>
                        <Settings size={18} className="mr-2" /> Settings
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-red-400 hover:bg-gray-600 hover:text-red-300" onClick={handleLogout}>
                        <LogOut size={18} className="mr-2" /> Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default SidebarFooter;
