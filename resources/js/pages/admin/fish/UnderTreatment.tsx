import DataTable from '@/components/DataTable';
import MainHeader from '@/components/MainHeader';
import Modal from '@/components/Modal';
import MultiPaginationNav from '@/components/MultiPaginationNav';
import Navbar from '@/components/ui/Navbar';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

type Fish = {
    id: string;
    code?: string;
    disease_id?: string;
};
type ModalState = {
    treatedFish: { isOpen: boolean; selectedFish: Fish | null };
};

const UnderTreatment = () => {
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
    const [modalState, setModalState] = useState<ModalState>({
        treatedFish: { isOpen: false, selectedFish: null },
    });
    const [selectedFish, setSelectedFish] = useState<Fish | null>(null);
    const { data, setData, post } = useForm({
        fish_id: selectedFish?.id || '',
        recoveryDate: '',
    });
    const { treatedFishes } = usePage().props;
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
                selectedFish: fish ?? null,
            },
        }));
    };
    const renderTreatmentActions = (fish: Fish) => (
        <button onClick={() => toggleModal('treatedFish', fish)} className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
            <Settings className="h-4 w-4" />
        </button>
    );
    const closeAllModals = () => {
        Object.keys(modalState).forEach((key) => {
            modalState[key as keyof ModalState].isOpen = false;
        });
    };
    return (
        <AdminLayout>
            <main className="grid gap-4">
                <Navbar links={links} />
                <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader title="Fishes Being Treated" variant="filter" />
                    <DataTable columns={treatedFishColumns} data={formatTreatedFishData()} actions={renderTreatmentActions} />
                    <MultiPaginationNav links={treatedFishes.links} queryParam="treatedFishPage" />
                </div>
            </main>

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

export default UnderTreatment;
