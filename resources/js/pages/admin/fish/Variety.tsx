import DataTable from '@/components/DataTable';
import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { usePage } from '@inertiajs/react';

const Variety = () => {
    const { fishVariety } = usePage().props;
    console.log(fishVariety.data);
    const formatVarietyData = () => {
        return fishVariety.data.map((item) => ({
            id: item.id,
            name: item.name,
        }));
    };
    const varietyColumns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Variety' },
    ];
    return (
        <AdminLayout>
            <main>
                <MainHeader title={'Fish Varieties'} />
                <DataTable data={formatVarietyData()} columns={varietyColumns} />
            </main>
        </AdminLayout>
    );
};

export default Variety;
