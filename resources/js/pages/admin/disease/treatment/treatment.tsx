import PaginationNav from '@/components/PaginationNav';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import DataTable from '../../../../components/DataTable';
import MainHeader from '../../../../components/MainHeader';

const treatment = () => {
    const { treatments, diseases, medicines } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        disease_id: '',
        medicine_id: '',
        description: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('treatment.store'));
    };
    console.log(medicines);
    console.log(diseases);
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
                    <MainHeader title="Disease Treatment" onClickCreate={() => manageModal('modalCreate')} variant="primary" />

                    <DataTable columns={columns} data={treatments.data} />
                    <PaginationNav links={treatments.links} />
                </div>
            </main>
            {modals.modalCreate && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="w-1/2 rounded-lg bg-[#060E1C] p-6 shadow-lg">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold">Create New Treatment</h2>
                            <button onClick={() => manageModal('modalCreate')} className="text-gray-500 hover:text-gray-700">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-2">
                                <div>
                                    <label className="text-md font-bold text-white">Treatment Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-md font-bold text-white">Treatment for Disease</label>
                                    <select
                                        value={data.disease_id}
                                        onChange={(e) => setData('disease_id', e.target.value)}
                                        aria-placeholder="Treatment for Disease"
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                        name="disease"
                                        id="disease"
                                    >
                                        <option value=""></option>
                                        {diseases.map((disease) => (
                                            <option key={disease.id} value={disease.id}>
                                                {disease.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-md font-bold text-white">Medicine used in Treatment</label>
                                    <select
                                        // value={data.medicine_id}
                                        onChange={(e) => setData('medicine_id', e.target.value)}
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                        name="disease"
                                        id="disease"
                                        aria-placeholder="Medicine Used for Treatment"
                                    >
                                        <option value=""></option>
                                        {medicines.map((medicine) => (
                                            <option key={medicine.id} value={medicine.id}>
                                                {medicine.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-md font-bold text-white">Description</label>
                                    <input
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                        type="text"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                </div>
                                <button type="submit" disabled={processing} className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default treatment;
