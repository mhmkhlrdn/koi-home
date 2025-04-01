import Modal from '@/components/Modal';
import MultiPaginationNav from '@/components/MultiPaginationNav';
import AdminLayout from '@/layouts/AdminLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import DataTable from '../../../components/DataTable';
import MainHeader from '../../../components/MainHeader';
import Navbar from '../../../components/ui/Navbar';

type Fish = {
    id: string;
    code?: string;
    disease_id?: string;
};

type ModalState = {
    manageFish: { isOpen: boolean; selectedFish: Fish | null };
    treatedFish: { isOpen: boolean; selectedFish: Fish | null };
    recoveryFish: { isOpen: boolean };
    applyTreatment: { isOpen: boolean };
};

const SickFishes = () => {
    const { sickFishes, treatedFishes, availableTreatment, unavailableTreatment } = usePage().props;
    const [selectedFish, setSelectedFish] = useState<Fish | null>(null);
    const { data, setData, post } = useForm({
        fish_id: selectedFish?.id || '',
        recoveryDate: '',
    });

    const [modalState, setModalState] = useState<ModalState>({
        manageFish: { isOpen: false, selectedFish: null },
        treatedFish: { isOpen: false, selectedFish: null },
        recoveryFish: { isOpen: false },
        applyTreatment: { isOpen: false },
    });

    const [timeLeftMap, setTimeLeftMap] = useState<Record<string, string>>({});

    // Calculate time left for each treated fish
    useEffect(() => {
        const calculateTimeLeft = () => {
            const updatedTimeLeft: Record<string, string> = {};

            treatedFishes.data.forEach((item) => {
                if (!item.schedule?.datetime) {
                    updatedTimeLeft[item.id] = 'N/A';
                    return;
                }

                const appointmentTime = new Date(item.schedule.datetime);
                const currentTime = new Date();
                const diffMs = appointmentTime - currentTime;

                if (diffMs <= 0) {
                    updatedTimeLeft[item.id] = "Time's up";
                } else {
                    const hours = Math.floor(diffMs / (1000 * 60 * 60));
                    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                    updatedTimeLeft[item.id] = `${hours}h ${minutes}m`;
                }
            });

            setTimeLeftMap(updatedTimeLeft);
        };

        const interval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(interval);
    }, [treatedFishes]);

    useEffect(() => {
        if (selectedFish) {
            setData('fish_id', selectedFish.id);
        }
    }, [selectedFish]);

    const toggleModal = (modalName: keyof ModalState, fish: Fish | null = null) => {
        if (fish) setSelectedFish(fish);

        setModalState((prev) => ({
            ...prev,
            [modalName]: {
                isOpen: !prev[modalName]?.isOpen,
                ...(fish ? { selectedFish: fish } : {}),
            },
        }));
    };

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

    const renderFishActions = (fish: Fish) => (
        <button onClick={() => toggleModal('manageFish', fish)} className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
            <Settings className="h-4 w-4" />
        </button>
    );

    const renderTreatmentActions = (fish: Fish) => (
        <button onClick={() => toggleModal('treatedFish', fish)} className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
            <Settings className="h-4 w-4" />
        </button>
    );

    const formatSickFishData = () => {
        return sickFishes.data.map((item) => ({
            id: item.id,
            fish_code: item.fish?.code || 'N/A',
            disease_name: item.disease?.name || 'N/A',
            disease_id: item.disease?.id || 'N/A',
            diagnosis_date: item.diagnosis_date,
            recovery_date: item.recovery_date,
            diagnosed_by: item.user?.name || 'N/A',
        }));
    };

    const formatTreatedFishData = () => {
        return treatedFishes.data.map((item) => ({
            id: item.id,
            sickfish_code: item.fish_disease?.fish?.code || 'N/A',
            treatment_name: item.treatment?.name || 'N/A',
            dosage: item.dosage ? `${item.dosage} ${item.treatment?.medicine?.measurement?.name}` : 'N/A',
            next_appointment: item.schedule?.datetime || 'N/A',
            time_left: timeLeftMap[item.id] || 'Calculating...',
            method: item.method,
            applied_by: item.user?.name || 'N/A',
        }));
    };

    const sickFishColumns = [
        { key: 'id', label: 'ID' },
        { key: 'fish_code', label: 'Fish' },
        { key: 'disease_name', label: 'Disease' },
        { key: 'diagnosis_date', label: 'Diagnosis Date' },
        { key: 'recovery_date', label: 'Recovery Date' },
        { key: 'diagnosed_by', label: 'Diagnosed By' },
    ];

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

    const links = [
        {
            label: 'Diagnosed',
            route: 'sickfishes',
        },
        {
            label: 'Under Treatment',
            route: 'treatedfishes',
        },
    ];

    return (
        <AdminLayout>
            <main className="grid gap-4">
                <Navbar links={links} />
                {/* Sick Fishes Section */}
                <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader title="Sick Fishes" variant="filter" />
                    <DataTable classStyles="min-h-[38.5em]" columns={sickFishColumns} data={formatSickFishData()} actions={renderFishActions} />
                    <MultiPaginationNav links={sickFishes.links} queryParam="sickFishesPage" />
                </div>

                {/* Treated Fishes Section */}
                <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader title="Fishes Being Treated" variant="filter" />
                    <DataTable columns={treatedFishColumns} data={formatTreatedFishData()} actions={renderTreatmentActions} />
                    <MultiPaginationNav links={treatedFishes.links} queryParam="treatedFishPage" />
                </div>
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
                {selectedFish ? (
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <TreatmentSection
                            title="Available Treatments"
                            treatments={availableTreatment.filter((t) => t.disease_id === selectedFish.disease_id)}
                            className="text-green-400"
                            isAvailable={true}
                        />
                        <TreatmentSection
                            title="Unavailable Treatments"
                            treatments={unavailableTreatment.filter((t) => t.disease_id === selectedFish.disease_id)}
                            className="text-red-400"
                            isAvailable={false}
                        />
                    </div>
                ) : (
                    <p className="text-center text-gray-400">Select a fish to view treatments.</p>
                )}
            </Modal>

            <Modal isOpen={modalState.treatedFish.isOpen} onClose={() => toggleModal('treatedFish')} title="Manage Treatment">
                {selectedFish ? (
                    <div className="flex gap-x-3"></div>
                ) : (
                    <p className="text-center text-gray-400">Select a fish to manage treatment.</p>
                )}
            </Modal>
        </AdminLayout>
    );
};

type TreatmentSectionProps = {
    title: string;
    treatments: any[];
    className: string;
    isAvailable: boolean;
};

const TreatmentSection = ({ title, treatments, className, isAvailable }: TreatmentSectionProps) => (
    <div>
        <h3 className={`text-lg font-semibold ${className}`}>{title}</h3>
        <div className="grid gap-2">
            {treatments.map((treatment) =>
                isAvailable ? (
                    <button
                        key={treatment.id}
                        onClick={() => {
                            router.post('/kh-admin/fishes/treatment', {
                                Treatment: treatment.id,
                                Fish: treatment.id,
                            });
                        }}
                        className="w-full rounded-lg bg-gray-800 p-3 text-white hover:bg-green-500"
                    >
                        {treatment.name}
                    </button>
                ) : (
                    <div key={treatment.id} className="w-full rounded-lg bg-gray-800 p-3 text-gray-400 opacity-50">
                        {treatment.name} (Medicine Out of Stock)
                    </div>
                ),
            )}
        </div>
    </div>
);

export default SickFishes;
