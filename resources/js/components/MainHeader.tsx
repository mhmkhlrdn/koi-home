import { Link } from '@inertiajs/react';
import { ListFilter, Plus } from 'lucide-react';

const MainHeader = ({ title, variant, createHref }: any) => {
    //variant : primary = both buttons; filter = only filter; create = only create;
    return (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-600 px-4 py-2 shadow-md">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex">
                <button
                    className={`${variant === 'filter' || variant === 'primary' ? '' : 'hidden'} flex items-center gap-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700`}
                >
                    <ListFilter className="h-5 w-5" />
                    Filter
                </button>
                <Link
                    href={`${createHref}`}
                    className={`${variant === 'create' || variant === 'primary' ? '' : 'hidden'} flex items-center gap-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700`}
                >
                    <Plus className="h-5 w-5" />
                    Create Data
                </Link>
            </div>
        </div>
    );
};

export default MainHeader;
