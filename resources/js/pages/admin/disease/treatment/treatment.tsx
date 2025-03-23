import PaginationNav from '@/components/PaginationNav';
import AdminLayout from '@/layouts/AdminLayout';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from '../../../../components/DataTable';
import MainHeader from '../../../../components/MainHeader';

const treatment = () => {
    const { treatments } = usePage().props;
    const [modals, setModals] = useState({
        modalCreate: false,
        modalFilter: false,
        modalEdit: false,
        modalDelete: false,
    });

    const manageModal = (modalName) => {
        setModals((prev) => ({
            ...prev,
            [modalName]: !prev[modalName],
        }));
    };
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        {
            key: 'disease.name',
            label: 'Treatment for Disease',
            render: (item: any) => item.disease?.name || 'N/A',
        },
        {
            key: 'medicine.name',
            label: 'Medicine Used',
            render: (item: any) => item.medicine?.name || 'N/A',
        },
        { key: 'description', label: 'Description' },
    ];
    return (
        <AdminLayout>
            <main className="grid grid-cols-4 gap-4">
                <div className="col-span-4 rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader title="Disease Treatment" variant="primary" />
                    <DataTable columns={columns} data={treatments.data} />
                    <PaginationNav links={treatments.links} />
                </div>
            </main>
            {modals.modalCreate && <div> A is open</div>}
        </AdminLayout>
    );
};

export default treatment;
