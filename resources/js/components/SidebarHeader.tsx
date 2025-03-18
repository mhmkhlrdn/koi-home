import { usePage } from '@inertiajs/react';

interface Information {
    logo_url: string;
    name: string;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
}

const SidebarHeader = () => {
    const { info } = usePage().props as { info?: Information | null };
    if (!info) {
        return <div className="text-gray-400">No company data available.</div>;
    }

    return (
        <div className="flex items-center gap-2 rounded-md bg-gray-800 p-4">
            <img src={info.logo_url} alt="Company Logo" className="h-12 w-12 rounded-full" />
            <h2 className="text-lg font-bold">{info.name}</h2>
        </div>
    );
};

export default SidebarHeader;
