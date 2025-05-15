import DataTable from '@/components/DataTable';
import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

const Variety = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });
    const manageModal = (modalName: string) => {
        setModals((prev) => ({
            ...prev,
            [modalName]: !prev[modalName],
        }));
    };
    const [modals, setModals] = useState({
        modalCreate: false,
        modalFilter: false,
        modalEdit: false,
        modalDelete: false,
    });
    const { fishVariety }: any = usePage().props;
    console.log(fishVariety.data);
    const formatVarietyData = () => {
        return fishVariety.map((item: any) => ({
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('variety.store'));
        manageModal('modalCreate');
    };
    return (
        <AdminLayout>
            <main className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                <MainHeader variant={'primary'} onClickCreate={() => manageModal('modalCreate')} title={'Fish Varieties'} />
                <DataTable data={formatVarietyData()} columns={varietyColumns} />
            </main>
            {modals.modalCreate && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="w-1/2 rounded-lg bg-[#060E1C] p-6 shadow-lg">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold">Create New Variety</h2>
                            <button onClick={() => manageModal('modalCreate')} className="text-gray-500 hover:text-gray-700">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label className="text-md font-bold text-white">Variety Name</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                    />
                                </div>
                                <button type="submit" disabled={processing} className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white">
                                    {processing ? 'Saving...' : 'Save'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default Variety;
