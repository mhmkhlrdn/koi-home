import AdminLayout from '@/layouts/AdminLayout';
import { usePage } from '@inertiajs/react';
import { Eye, X } from 'lucide-react';
import { useState } from 'react';
import DataTable from '../../components/DataTable';
import MainHeader from '../../components/MainHeader';

const Diseases = () => {
    const { diseases, fishWithDisease } = usePage().props;
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (disease) => {
        setSelectedDisease(disease);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedDisease(null);
        setIsModalOpen(false);
    };

    // Function to count the number of fish diagnosed with each disease
    const getDiagnosedFishCount = (diseaseId) => {
        return fishWithDisease.filter((fish) => fish.disease_id === diseaseId).length;
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Disease' },
        { key: 'description', label: 'Description' },
        {
            key: 'diagnosed_count',
            label: 'Diagnosed Fish',
            render: (disease) => (
                <div className="flex items-center justify-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white">
                        {getDiagnosedFishCount(disease.id)}
                    </span>
                </div>
            ),
        },
    ];

    const renderActions = (disease) => (
        <>
            <button onClick={() => handleOpenModal(disease)} className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
                <Eye className="h-4 w-4" />
            </button>
        </>
    );

    const diagnosedFish = selectedDisease ? fishWithDisease.filter((fish) => fish.disease_id === selectedDisease.id) : [];

    return (
        <AdminLayout>
            <main>
                <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader title="Disease List" variant="primary" createHref="/kh-admin/disease/create" />
                    <DataTable columns={columns} data={diseases} actions={(disease) => renderActions(disease)} />
                </div>
            </main>

            {isModalOpen && (
                <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
                    <div className="w-full max-w-lg rounded-lg bg-gray-800 p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Fish Diagnosed with {selectedDisease?.name}</h2>
                            <button onClick={handleCloseModal} className="text-white hover:text-gray-300">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-4">
                            {diagnosedFish.length > 0 ? (
                                <ul className="space-y-2">
                                    {diagnosedFish.map((fish) => (
                                        <li key={fish.id} className="rounded bg-gray-700 p-3 text-white">
                                            {fish.fish?.code || 'Unknown Fish'} - Diagnosed on {fish.diagnosis_date}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400">No fish diagnosed with this disease.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default Diseases;
