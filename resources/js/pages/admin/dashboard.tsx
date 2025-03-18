import AdminLayout from '@/layouts/AdminLayout';
import { usePage } from '@inertiajs/react';

const page = () => {
    const { fishesCount } = usePage().props;
    return (
        <AdminLayout>
            <main className="m-4 grid grid-cols-3 grid-rows-4 gap-6"></main>
        </AdminLayout>
    );
};

export default page;
