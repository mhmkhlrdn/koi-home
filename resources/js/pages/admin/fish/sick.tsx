//@ts-nocheck

import Modal from '@/components/Modal';
import PaginationNav from '@/components/PaginationNav';
import ButtonLink from '@/components/ui/ButtonLink';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from '../../../components/DataTable';
import MainHeader from '../../../components/MainHeader';

const SickFishes = () => {
    const { sickFishes, diseaseFishes, fishDiseases } = usePage().props;
    const [selectedFish, setSelectedFish] = useState(null);
    const { data, setData, post } = useForm({
        fish_id: selectedFish?.id || '', // Send the selected fish ID
        recoveryDate: '',
    });

    // Object to manage multiple modals dynamically
    const [modalState, setModalState] = useState({
        manageFish: { isOpen: false, selectedFish: null },
        recoveryFish: { isOpen: false },
        applyTreatment: { isOpen: false },
    });

    // Toggle any modal by name
    const handleModalState = (modalName, fish = null) => {
        if (fish) setSelectedFish(fish);

        setModalState((prev) => ({
            ...prev,
            [modalName]: {
                isOpen: !prev[modalName]?.isOpen,
                ...(fish ? { selectedFish: fish } : {}),
            },
        }));
    };

    useEffect(() => {
        if (selectedFish) {
            setData('fish_id', selectedFish.id);
            console.log(selectedFish);
        }
    }, [selectedFish]);

    const closeAllModals = () => {
        modalState.applyTreatment.isOpen = false;
        modalState.recoveryFish.isOpen = false;
        modalState.manageFish.isOpen = false;
    };

    const handleRecoveryForm = (e) => {
        e.preventDefault();
        post(route('fish.recovery'), {
            onSuccess: () => {
                closeAllModals();
            },
        });
    };

    const renderActions = (fish) => (
        <button onClick={() => handleModalState('manageFish', fish)} className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
            <Settings className="h-4 w-4" />
        </button>
    );

    const formattedData = sickFishes.data.map((item) => ({
        id: item.id,
        fish_code: item.fish ? item.fish.code : 'N/A',
        disease_name: item.disease ? item.disease.name : 'N/A',
        diagnosis_date: item.diagnosis_date,
        recovery_date: item.recovery_date,
        diagnosed_by: item.user ? item.user.name : 'N/A',
    }));

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'fish_code', label: 'Fish' },
        { key: 'disease_name', label: 'Disease' },
        { key: 'diagnosis_date', label: 'Diagnosis Date' },
        { key: 'recovery_date', label: 'Recovery Date' },
        { key: 'diagnosed_by', label: 'Diagnosed By' },
    ];

    return (
        <AdminLayout>
            <main className="grid gap-4">
                <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader title="Sick Fishes" variant="filter" />
                    <DataTable columns={columns} data={formattedData} actions={renderActions} />
                    <PaginationNav links={sickFishes.links} />
                </div>
            </main>

            {/* Manage Fish Modal */}
            <Modal isOpen={modalState.manageFish.isOpen} onClose={() => handleModalState('manageFish')} title="Manage Fish">
                <div className="flex gap-x-3">
                    <button className="flex-1 cursor-pointer rounded-md bg-gray-800 px-4 py-4" onClick={() => handleModalState('applyTreatment')}>
                        <div className="">Apply Treatment</div>
                    </button>
                    <button
                        className="flex-1 cursor-pointer gap-x-3 rounded-md bg-gray-800 px-4 py-4"
                        onClick={() => handleModalState('recoveryFish')}
                    >
                        <div className="">Has Recovered</div>
                    </button>
                </div>
            </Modal>

            {/* Recovery Modal */}
            <Modal isOpen={modalState.recoveryFish.isOpen} onClose={() => handleModalState('recoveryFish')} title="Fish Recovery">
                <form className="flex flex-col gap-y-4" onSubmit={handleRecoveryForm}>
                    <label>Recovery Date</label>
                    <input
                        className="flex-1 rounded-md bg-gray-800 p-4"
                        type="date"
                        name="recoveryDate"
                        id="recoveryDate"
                        value={data.recoveryDate}
                        onChange={(e) => setData('recoveryDate', e.target.value)}
                    />
                    <button className="flex-1 cursor-pointer rounded-md bg-gray-800 px-4 py-4" type="submit">
                        <div className="">Confirm Recovery</div>
                    </button>
                </form>
            </Modal>

            {/* Treatment Modal */}
            <Modal isOpen={modalState.applyTreatment.isOpen} onClose={() => handleModalState('applyTreatment')} title="Apply Treatment">
                <div className="flex gap-x-3 py-4">
                    <ButtonLink classNames="flex-1" variant="primary" label="Confirm Treatment" href={``} />
                </div>
            </Modal>
        </AdminLayout>
    );
};

export default SickFishes;
