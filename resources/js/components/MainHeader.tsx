import { Link } from '@inertiajs/react';
import { ListFilter, Plus } from 'lucide-react';

const MainHeader = ({ title, variant, createHref, styleClass, onClickCreate, onClickFilter }: any) => {
    //variant : primary = both buttons; filter = only filter; create = only create;
    return (
        <div className={`mb-4 flex items-center justify-between rounded-lg bg-gray-600 px-4 py-2 shadow-md ${styleClass}`}>
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex">
                <button
                    onClick={onClickFilter}
                    className={`${variant === 'filter' || variant === 'primary' ? '' : 'hidden'} flex items-center gap-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700`}
                >
                    <ListFilter className="h-5 w-5" />
                    Filter
                </button>
                {createHref ? (
                    <Link
                        className={`${variant === 'create' || variant === 'primary' ? '' : 'hidden'} flex items-center gap-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700`}
                        href={createHref}
                    >
                        <Plus className="h-5 w-5" />
                        Create Data
                    </Link>
                ) : (
                    <button
                        onClick={onClickCreate}
                        className={`${variant === 'create' || variant === 'primary' ? '' : 'hidden'} flex items-center gap-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700`}
                    >
                        <Plus className="h-5 w-5" />
                        Create Data
                    </button>
                )}
            </div>
        </div>
    );
};

export default MainHeader;
