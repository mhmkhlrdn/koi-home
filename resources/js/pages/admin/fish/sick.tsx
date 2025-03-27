import Modal from '@/components/Modal';
import MultiPaginationNav from '@/components/MultiPaginationNav';
import AdminLayout from '@/layouts/AdminLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from '../../../components/DataTable';
import MainHeader from '../../../components/MainHeader';

const SickFishes = () => {
    const { sickFishes, treatedFishes, availableTreatment, unavailableTreatment } = usePage().props;
    const [selectedFish, setSelectedFish] = useState(null);
    const { data, setData, post } = useForm({
        fish_id: selectedFish?.id || '', // Send the selected fish ID
        recoveryDate: '',
    });

    // Object to manage multiple modals dynamically
    const [modalState, setModalState] = useState({
        manageFish: { isOpen: false, selectedFish: null },
        treatedFish: { isOpen: false, selectedFish: null },
        recoveryFish: { isOpen: false },
        applyTreatment: { isOpen: false },
    });

    // console.log('treated fishes: ', treatedFishes);
    console.log('selected fish', selectedFish);

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
            // console.log(selectedFish);
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
    const renderTreatmentActions = (fish) => (
        <button onClick={() => handleModalState('treatedFish', fish)} className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
            <Settings className="h-4 w-4" />
        </button>
    );

    const handleTreatedOnce = () => {
        console.log('handle treated once, frequency', parseInt(selectedFish.frequency));
        if (parseInt(selectedFish.frequency) > 0) {
            router.post('/kh-admin/fishes/treatment/update', {
                fish_id: selectedFish.id,
                frequency: parseInt(selectedFish.frequency) - 1,
            });
        }
    };

    const handleDailyTreatmentCompleted = () => {
        router.post('/kh-admin/fishes/treatment/update', {
            fish_id: selectedFish.id,
            frequency: 0,
        });
    };

    const formattedData = sickFishes.data.map((item) => ({
        id: item.id,
        fish_code: item.fish ? item.fish.code : 'N/A',
        disease_name: item.disease ? item.disease.name : 'N/A',
        disease_id: item.disease ? item.disease.id : 'N/A',
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
    const formattedTreatmentData = treatedFishes.data.map((item) => ({
        id: item.id,
        sickfish_code: item.fish_disease.fish.code ? item.fish_disease.fish.code : 'N/A',
        treatment_name: item.treatment ? item.treatment.name : 'N/A',
        dosage: item.dosage ? item.dosage + ' ' + item.treatment.medicine.measurement.name : 'N/A',
        frequency: item.frequency,
        method: item.method,
        applied_by: item.user ? item.user.name : 'N/A',
    }));

    const treatmentColumns = [
        { key: 'id', label: 'ID' },
        { key: 'sickfish_code', label: 'Fish' },
        { key: 'treatment_name', label: 'Treatment' },
        { key: 'dosage', label: 'Dosage' },
        { key: 'frequency', label: 'Frequency' },
        { key: 'method', label: 'Method' },
        { key: 'applied_by', label: 'Treatment Applied By' },
    ];

    return (
        <AdminLayout>
            <main className="grid gap-4">
                <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader title="Sick Fishes" variant="filter" />
                    <DataTable classStyles="min-h-[38.5em]" columns={columns} data={formattedData} actions={renderActions} />
                    <MultiPaginationNav links={sickFishes.links} queryParam="sickFishesPage" />
                </div>

                <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader title="Fishes Being Treated" variant="filter" />
                    <DataTable columns={treatmentColumns} data={formattedTreatmentData} actions={renderTreatmentActions} />
                    <MultiPaginationNav links={treatedFishes.links} queryParam="treatedFishPage" />
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
                {selectedFish ? (
                    <div className="grid grid-cols-2 gap-4 py-4">
                        {/* Available Treatments */}
                        <div>
                            <h3 className="text-lg font-semibold text-green-400">Available Treatments</h3>
                            <div className="grid gap-2">
                                {availableTreatment
                                    .filter((t) => t.disease_id === selectedFish.disease_id)
                                    .map((at) => (
                                        <button
                                            onClick={() => {
                                                router.post('/kh-admin/fishes/treatment', {
                                                    Treatment: at.id,
                                                    Fish: selectedFish.id,
                                                });
                                            }}
                                            className="w-full rounded-lg bg-gray-800 p-3 text-white hover:bg-green-500"
                                        >
                                            {at.name}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        {/* Unavailable Treatments */}
                        <div>
                            <h3 className="text-lg font-semibold text-red-400">Unavailable Treatments</h3>
                            <div className="grid gap-2">
                                {unavailableTreatment
                                    .filter((t) => t.disease_id === selectedFish.disease_id)
                                    .map((ut) => (
                                        <div key={ut.id} className="w-full rounded-lg bg-gray-800 p-3 text-gray-400 opacity-50">
                                            {ut.name} (Medicine Out of Stock)
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-400">Select a fish to view treatments.</p>
                )}
            </Modal>

            <Modal isOpen={modalState.treatedFish.isOpen} onClose={() => handleModalState('treatedFish')} title="Manage Treatment">
                {selectedFish ? (
                    <div className="flex gap-x-3">
                        <button
                            className="flex-1 rounded-md bg-gray-800 px-4 py-4 text-white hover:bg-green-500"
                            onClick={handleTreatedOnce}
                            disabled={selectedFish.frequency === 0}
                        >
                            Treated Once ({selectedFish.frequency})
                        </button>
                        <button
                            className="flex-1 rounded-md bg-gray-800 px-4 py-4 text-white hover:bg-red-500"
                            onClick={handleDailyTreatmentCompleted}
                        >
                            Daily Treatment Completed
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-400">Select a fish to manage treatment.</p>
                )}
            </Modal>
        </AdminLayout>
    );
};

export default SickFishes;
