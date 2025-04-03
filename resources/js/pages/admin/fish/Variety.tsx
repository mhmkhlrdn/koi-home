import DataTable from '@/components/DataTable';
import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { usePage } from '@inertiajs/react';

const Variety = () => {
    const { fishVariety }: any = usePage().props;
    console.log(fishVariety.data);
    const formatVarietyData = () => {
        return fishVariety.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            fishes_count: item.fishes_count,
        }));
    };
    const varietyColumns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Variety' },
        { key: 'fishes_count', label: 'Fishes With This Variety' },
    ];
    return (
        <AdminLayout>
            <main className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                <MainHeader variant={'primary'} title={'Fish Varieties'} />
                <DataTable data={formatVarietyData()} columns={varietyColumns} />
            </main>
        </AdminLayout>
    );
};

export default Variety;
