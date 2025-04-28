import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import * as Icons from 'lucide-react';

type MenuItem = {
    id: number;
    title: string;
    url: string;
    icon_tag: string;
    parent_id_title: string | null;
    isEnabled: boolean;
};

const Menu = () => {
    const { put, data, setData, processing } = useForm({
        id: '',
        title: '',
        url: '',
        icon: '',
        enabled: 0,
        parent: 0,
    });

    const enableMenu = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        put(route('enableMenu', id));
    };

    const disableMenu = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault();
        put(route('disableMenu', id));
    };

    const { menuInfo } = usePage().props;
    console.log('menu', menuInfo);
    return (
        <AdminLayout>
            <main className="mainWrapper space-y-6">
                <MainHeader title="Menu Information" variant="create" />
                <div className="overflow-x-auto rounded">
                    <table className="min-w-full rounded bg-gray-700 text-white">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="p-3 text-left font-semibold">ID</th>
                                <th className="p-3 text-left font-semibold">Title</th>
                                <th className="p-3 text-left font-semibold">URL</th>
                                <th className="p-3 text-left font-semibold">Icon</th>
                                <th className="p-3 text-left font-semibold">Parent Menu</th>
                                <th className="p-3 text-left font-semibold">Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuInfo.map((menu) => {
                                const Icon = Icons[menu.icon_tag as keyof typeof Icons];
                                return (
                                    <tr key={menu.id} className="border-t border-gray-600">
                                        <td className="p-3">{menu.id}</td>
                                        <td className="p-3">{menu.title}</td>
                                        <td className="p-3">{menu.url}</td>
                                        <td className="flex items-center gap-2 p-3">
                                            {Icon ? <Icon className="h-5 w-5" /> : null}
                                            <span className="font-mono text-sm">{`<${menu.icon_tag} />`}</span>
                                        </td>
                                        <td className="p-3">{menu.parent?.title ?? '-'}</td>
                                        <td className="p-3">
                                            {menu.isEnabled ? (
                                                <button
                                                    disabled={processing}
                                                    onClick={(e) => disableMenu(e, menu.id)}
                                                    className="inline-block cursor-pointer rounded bg-green-600 px-2 py-1 text-xs font-medium text-white"
                                                >
                                                    Yes
                                                </button>
                                            ) : (
                                                <button
                                                    disabled={processing}
                                                    onClick={(e) => enableMenu(e, menu.id)}
                                                    className="inline-block cursor-pointer rounded bg-red-600 px-2 py-1 text-xs font-medium text-white"
                                                >
                                                    No
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </AdminLayout>
    );
};

export default Menu;
