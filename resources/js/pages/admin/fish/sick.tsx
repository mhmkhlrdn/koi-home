import Modal from '@/components/Modal';
import MultiPaginationNav from '@/components/MultiPaginationNav';
import AdminLayout from '@/layouts/AdminLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import MainHeader from '../../../components/MainHeader';

type Fish = {
    id: string;
    code?: string;
    disease_id?: string;
};

type ModalState = {
    manageFish: { isOpen: boolean; selectedFish: Fish | null };
    // treatedFish: { isOpen: boolean; selectedTreatedFish: Fish | null };
    recoveryFish: { isOpen: boolean };
    applyTreatment: { isOpen: boolean };
};

const SickFishes = () => {
    const { sickFishes, availableTreatment, unavailableTreatment } = usePage().props;
    const [selectedFish, setSelectedFish] = useState<Fish | null>(null);
    const { data, setData, post } = useForm({
        fish_id: selectedFish?.id || '',
        recoveryDate: '',
    });

    const [modalState, setModalState] = useState<ModalState>({
        manageFish: { isOpen: false, selectedFish: null },
        // treatedFish: { isOpen: false, selectedTreatedFish: null },
        recoveryFish: { isOpen: false },
        applyTreatment: { isOpen: false },
    });

    const [timeLeftMap, setTimeLeftMap] = useState<Record<string, string>>({});

    // Calculate time left for each treated fish
    // useEffect(() => {
    //     const calculateTimeLeft = () => {
    //         const updatedTimeLeft: Record<string, string> = {};

    //         treatedFishes.data.forEach((item) => {
    //             if (!item.schedule?.datetime) {
    //                 updatedTimeLeft[item.id] = 'N/A';
    //                 return;
    //             }

    //             const appointmentTime = new Date(item.schedule.datetime);
    //             const currentTime = new Date();
    //             const diffMs = appointmentTime - currentTime;

    //             if (diffMs <= 0) {
    //                 updatedTimeLeft[item.id] = "Time's up";
    //             } else {
    //                 const hours = Math.floor(diffMs / (1000 * 60 * 60));
    //                 const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    //                 updatedTimeLeft[item.id] = `${hours}h ${minutes}m`;
    //             }
    //         });

    //         setTimeLeftMap(updatedTimeLeft);
    //     };

    //     const interval = setInterval(calculateTimeLeft, 1000);
    //     return () => clearInterval(interval);
    // }, [treatedFishes]);

    useEffect(() => {
        if (selectedFish) {
            setData('fish_id', selectedFish.id);
        }
    }, [selectedFish]);

    const toggleModal = (modalName: keyof ModalState, fish: Fish | null = null) => {
        setSelectedFish(fish ?? null);
        setModalState((prev) => ({
            ...prev,
            [modalName]: {
                isOpen: !prev[modalName].isOpen,
                selectedFish: fish ?? null,
            },
        }));
        console.log('selected fish', selectedFish);
        console.log('selected fish disease id', selectedFish.disease_id);
    };

    // const toggleTreatmentModal = (modalName: keyof ModalState, fish: Fish | null = null) => {
    //     setSelectedFish(fish ?? null);
    //     setModalState((prev) => ({
    //         ...prev,
    //         [modalName]: {
    //             isOpen: !prev[modalName].isOpen,
    //             selectedTreatedFish: fish ?? null,
    //         },
    //     }));
    // };

    const closeAllModals = () => {
        Object.keys(modalState).forEach((key) => {
            modalState[key as keyof ModalState].isOpen = false;
        });
    };

    const handleRecoveryForm = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('fish.recovery'), {
            onSuccess: () => closeAllModals(),
        });
    };

    // const renderTreatmentActions = (fish: Fish) => (
    //     <button onClick={() => toggleTreatmentModal('treatedFish', fish)} className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
    //         <Settings className="h-4 w-4" />
    //     </button>
    // );

    // const formatTreatedFishData = () => {
    //     return treatedFishes.data.map((item) => ({
    //         id: item.id,
    //         sickfish_code: item.fish_disease?.fish?.code || 'N/A',
    //         treatment_name: item.treatment?.name || 'N/A',
    //         dosage: item.dosage ? `${item.dosage} ${item.treatment?.medicine?.measurement?.name}` : 'N/A',
    //         next_appointment: item.schedule?.datetime || 'N/A',
    //         time_left: timeLeftMap[item.id] || 'Calculating...',
    //         method: item.method,
    //         applied_by: item.user?.name || 'N/A',
    //     }));
    // };

    const treatedFishColumns = [
        { key: 'id', label: 'ID' },
        { key: 'sickfish_code', label: 'Fish' },
        { key: 'treatment_name', label: 'Treatment' },
        { key: 'dosage', label: 'Dosage' },
        { key: 'next_appointment', label: 'Next Appointment' },
        { key: 'time_left', label: 'Time Left' },
        { key: 'method', label: 'Method' },
        { key: 'applied_by', label: 'Treatment Applied By' },
    ];

    return (
        <AdminLayout>
            <main className="grid gap-4">
                {/* Sick Fishes Section */}
                <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader title="Sick Fishes" variant="filter" />
                    <div className={`overflow-x-auto rounded-lg bg-[#485367] shadow-md`}>
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="border p-3">ID</th>
                                    <th className="border p-3">Code</th>
                                    <th className="border p-3">Disease Name</th>
                                    <th className="border p-3">Diagnosis Date</th>
                                    <th className="border p-3">Recovery Date</th>
                                    <th className="border p-3">Diagnosed By</th>
                                    <th className="border p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sickFishes.data.map((sick) => (
                                    <tr className="mx-auto border-t text-center">
                                        <td className="border p-3">{sick.id}</td>
                                        <td className="border p-3">{sick.fish.code}</td>
                                        <td className="border p-3">{sick.disease.name}</td>
                                        <td className="border p-3">{sick.diagnosis_date}</td>
                                        <td className="border p-3">{sick.recovery_date ? sick.recovery_date : 'N/A'}</td>
                                        <td className="border p-3">{sick.user?.name}</td>
                                        <td className="border p-3">
                                            <button
                                                onClick={() => toggleModal('manageFish', sick)}
                                                className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                                            >
                                                <Settings className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <MultiPaginationNav links={sickFishes.links} queryParam="sickFishesPage" />
                </div>

                {/* Treated Fishes Section */}
                {/* <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader title="Fishes Being Treated" variant="filter" />
                    <DataTable
                        classStyles="min-h-[38.5em]"
                        columns={treatedFishColumns}
                        data={formatTreatedFishData()}
                        actions={renderTreatmentActions}
                    />
                    <MultiPaginationNav links={treatedFishes.links} queryParam="treatedFishPage" />
                </div> */}
            </main>

            {/* Manage Fish Modal */}
            <Modal isOpen={modalState.manageFish.isOpen} onClose={() => toggleModal('manageFish')} title="Manage Fish">
                <div className="flex gap-x-3">
                    <button className="flex-1 cursor-pointer rounded-md bg-gray-800 px-4 py-4" onClick={() => toggleModal('applyTreatment')}>
                        Apply Treatment
                    </button>
                    <button className="flex-1 cursor-pointer rounded-md bg-gray-800 px-4 py-4" onClick={() => toggleModal('recoveryFish')}>
                        Has Recovered
                    </button>
                </div>
            </Modal>

            {/* Recovery Modal */}
            <Modal isOpen={modalState.recoveryFish.isOpen} onClose={() => toggleModal('recoveryFish')} title="Fish Recovery">
                <form className="flex flex-col gap-y-4" onSubmit={handleRecoveryForm}>
                    <label>Recovery Date</label>
                    <input
                        className="flex-1 rounded-md bg-gray-800 p-4"
                        type="date"
                        name="recoveryDate"
                        value={data.recoveryDate}
                        onChange={(e) => setData('recoveryDate', e.target.value)}
                    />
                    <button className="flex-1 cursor-pointer rounded-md bg-gray-800 px-4 py-4" type="submit">
                        Confirm Recovery
                    </button>
                </form>
            </Modal>

            {/* Treatment Modal */}
            <Modal isOpen={modalState.applyTreatment.isOpen} onClose={() => toggleModal('applyTreatment')} title="Apply Treatment">
                <div className="grid grid-cols-2 gap-4 py-4">
                    {/* Available Treatments */}
                    <div>
                        <h3 className="text-lg font-semibold text-green-400">Available Treatments</h3>
                        <div className="grid gap-2">
                            {availableTreatment
                                .filter((t) => t.disease_id === selectedFish.disease_id)
                                .map((at) => (
                                    <button
                                        key={at.id}
                                        onClick={() => {
                                            router.post('/kh-admin/fishes/treatment', {
                                                Treatment: at.id,
                                                Fish: selectedFish?.id,
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
            </Modal>

            {/* <Modal isOpen={modalState.treatedFish.isOpen} onClose={() => toggleModal('treatedFish')} title="Manage Treatment">
                {selectedFish ? (
                    <div className="flex gap-x-3"></div>
                ) : (
                    <p className="text-center text-gray-400">Select a fish to manage treatment.</p>
                )}
            </Modal> */}
        </AdminLayout>
    );
};

type TreatmentSectionProps = {
    title: string;
    treatments: any[];
    className: string;
    isAvailable: boolean;
};

export default SickFishes;
