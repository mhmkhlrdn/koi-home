//@ts-nocheck

import ButtonLink from '@/components/ui/ButtonLink';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { CircleHelp, Mars, Pencil, Settings, Trash, Venus } from 'lucide-react';
import { useState } from 'react';
import MainHeader from '../../components/MainHeader';
import PaginationNav from '../../components/PaginationNav';
import DataTable from './../../components/DataTable';
import Modal from './../../components/Modal';

const Fishes = () => {
    const [selectedFish, setSelectedFish] = useState(null);
    const { fishItems, recentChanges, recentlyBornFishes, bloodlines, varieties, pools, pagination } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const { data, setData, put, processing, reset } = useForm({
        id: '',
        code: '',
        bloodline_id: '',
        variety_id: '',
        gender: '',
        birthDate: '',
        pool_id: '',
    });

    const openModal = (fish) => {
        setSelectedFish(fish);
        setIsModalOpen(true);
        setData({
            id: fish.id,
            code: fish.code,
            bloodline_id: fish.bloodline_id ? String(fish.bloodline_id) : '',
            variety_id: fish.variety_id ? String(fish.variety_id) : '',
            gender: fish.gender || 'unknown',
            birthDate: fish.birthDate || '',
            pool_id: fish.pool_id ? String(fish.pool_id) : '',
        });
    };

    const openManageModal = (fish) => {
        setSelectedFish(fish);
        setIsManageModalOpen(true);
    };

    const closeManageModal = () => {
        setIsManageModalOpen(false);
        reset();
    };
    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.id) {
            console.error('Error: Fish ID is missing!');
            return;
        }

        put(route('fishes.update', data.id), {
            preserveScroll: true,
            data: {
                ...data,
                bloodline_id: data.bloodline_id ? parseInt(data.bloodline_id, 10) : null,
                variety_id: data.variety_id ? parseInt(data.variety_id, 10) : null,
                pool_id: data.pool_id ? parseInt(data.pool_id, 10) : null,
            },
            onSuccess: () => closeModal(),
        });
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'code', label: 'Code' },
        { key: 'bloodline_name', label: 'Bloodline' },
        { key: 'variety_name', label: 'Variety' },
        {
            key: 'gender',
            label: 'Gender',
            render: (fish) =>
                fish.gender === 'unknown' ? (
                    <CircleHelp className="mx-auto block" />
                ) : fish.gender === 'female' ? (
                    <Venus className="mx-auto block" />
                ) : (
                    <Mars className="mx-auto block" />
                ),
        },
        { key: 'birthDate', label: 'Birth Date' },
        { key: 'pool_name', label: 'Pool' },
    ];
    const changesColumns = [
        { key: 'fish_code', label: 'Fish Code' },
        { key: 'user_name', label: 'Modified By' },
        { key: 'modified_at', label: 'Modified At' },
    ];
    const bornColumns = [
        { key: 'code', label: 'Fish Code' },
        { key: 'birthDate', label: 'Birth Date' },
    ];

    const renderActions = (fish) => (
        <>
            <button onClick={() => openModal(fish)} className="rounded bg-yellow-500 p-2 text-white hover:bg-yellow-600">
                <Pencil className="h-4 w-4" />
            </button>
            <button className="rounded bg-red-500 p-2 text-white hover:bg-red-600">
                <Trash className="h-4 w-4" />
            </button>
            <button onClick={() => openManageModal(fish)} className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
                <Settings className="h-4 w-4" />
            </button>
        </>
    );

    return (
        <AdminLayout>
            <main className="grid grid-cols-4 gap-4">
                <div className="col-span-4 rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader variant="primary" createHref={route('fishes.create')} title="Fish Management" />
                    <DataTable columns={columns} data={fishItems.data} actions={renderActions} />
                    <PaginationNav links={fishItems.links} />
                </div>
                <div className="col-span-2 rounded-2xl border-b-6 border-gray-900 bg-gray-700 p-6">
                    <h2 className="mb-3 flex justify-center text-xl font-semibold">Recent Changes</h2>
                    <DataTable columns={changesColumns} data={recentChanges} />
                </div>
                <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 p-6">
                    <h2 className="mb-3 flex justify-center text-xl font-semibold">Recently Born Fishes</h2>
                    <DataTable columns={bornColumns} data={recentlyBornFishes} />
                </div>
                <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 p-6"></div>
            </main>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Fish">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        placeholder="Fish Code"
                        className="w-full border p-2"
                        required
                    />

                    <select value={data.bloodline_id} onChange={(e) => setData('bloodline_id', e.target.value)} className="w-full border p-2">
                        <option value="">Select Bloodline</option>
                        {bloodlines.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </select>

                    <select value={data.variety_id} onChange={(e) => setData('variety_id', e.target.value)} className="w-full border p-2">
                        <option value="">Select Variety</option>
                        {varieties.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.name}
                            </option>
                        ))}
                    </select>

                    <select value={data.gender} onChange={(e) => setData('gender', e.target.value)} className="w-full border p-2">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unknown">Unknown</option>
                    </select>

                    <input
                        type="date"
                        value={data.birthDate}
                        onChange={(e) => setData('birthDate', e.target.value)}
                        className="w-full border p-2"
                        required
                    />

                    <select value={data.pool_id} onChange={(e) => setData('pool_id', e.target.value)} className="w-full border p-2">
                        <option value="">Select Pool</option>
                        {pools.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="w-full rounded bg-blue-600 p-2 text-white" disabled={processing}>
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </Modal>

            <Modal isOpen={isManageModalOpen} onClose={closeManageModal} title="Manage Fish">
                <div className="flex gap-x-3 py-4">
                    <ButtonLink
                        classNames="flex-1"
                        variant="primary"
                        label="Diagnose"
                        href={`/kh-admin/diagnosis/create?fish_id=${selectedFish?.id}`}
                    />
                    <ButtonLink classNames="flex-1" variant="primary" label="Breed" />
                    <ButtonLink classNames="flex-1" variant="primary" label="Sell" />
                    <ButtonLink classNames="flex-1" variant="primary" label="Measure" />
                </div>
            </Modal>
        </AdminLayout>
    );
};

export default Fishes;
