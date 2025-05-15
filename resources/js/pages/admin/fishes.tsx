//@ts-nocheck

import ButtonLink from '@/components/ui/ButtonLink';
import AdminLayout from '@/layouts/AdminLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import { CircleHelp, Mars, Pencil, Settings, Trash, Venus } from 'lucide-react';
import { useState } from 'react';
import MainHeader from '../../components/MainHeader';
import PaginationNav from '../../components/PaginationNav';
import DataTable from './../../components/DataTable';
import Modal from './../../components/Modal';

const Fishes = () => {
    const [selectedFish, setSelectedFish] = useState(null);
    const { fishItems, recentChanges, recentlyBornFishes, bloodlines, varieties, pools, pagination, users, fishSize } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
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

    const [filters, setFilters] = useState({
        bloodline_id: '',
        variety_id: '',
        owner_id: '',
        pool_id: '',
        search_input: '',
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

    console.log('recentlyBornFishes', recentlyBornFishes);
    console.log('recentChanges', recentChanges);
    const closeManageModal = () => {
        setIsManageModalOpen(false);
        reset();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const manageFilterModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
        reset();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleApply = () => {
        // Apply filters by redirecting with query parameters
        router.visit(route('fishes'), {
            method: 'get',
            data: filters,
            preserveScroll: true,
            preserveState: true,
        });
        // console.log(filters);
        manageFilterModal(); // Close the filter modal
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

    // console.log(fishSize);
    const extraInfo = [
        {
            key: 'fish_photo',
            label: 'Photo',
            render: (item) =>
                item.fish_photo ? (
                    <img src={'/' + item.fish_photo} alt="Fish" className="h-auto max-w-64 rounded object-fill" />
                ) : (
                    <span className="text-gray-400 italic">No photo</span>
                ),
        },

        {
            key: 'fish_size',
            label: 'Size (cm)',
            render: (item) => (item.fish_size ? <h1>{item.fish_size}</h1> : <span className="text-gray-400 italic">No data</span>),
        },
        {
            key: 'recorded_at',
            label: 'Recorded At',
            render: (item) => (item.recorded_at ? <h1>{item.recorded_at}</h1> : <span className="text-gray-400 italic">No data</span>),
        },
    ];
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
                    <MainHeader
                        variant="primary"
                        onClickFilter={manageFilterModal}
                        printRoute={route('fishes.cetak')}
                        createHref={route('fishes.create')}
                        title="Fish Management"
                    />
                    <DataTable extraInfo={extraInfo} columns={columns} data={fishItems.data} actions={renderActions} />
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

            {/* Edit Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Fish">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        value={data.code}
                        onChange={(e) => setData('code', e.target.value)}
                        placeholder="Fish Code"
                        className="modalInput"
                        required
                    />
                    <select value={data.bloodline_id} onChange={(e) => setData('bloodline_id', e.target.value)} className="modalInput">
                        <option value="">Select Bloodline</option>
                        {bloodlines.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                    <select value={data.variety_id} onChange={(e) => setData('variety_id', e.target.value)} className="modalInput">
                        <option value="">Select Variety</option>
                        {varieties.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.name}
                            </option>
                        ))}
                    </select>
                    <select value={data.gender} onChange={(e) => setData('gender', e.target.value)} className="modalInput">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unknown">Unknown</option>
                    </select>
                    <input
                        type="date"
                        value={data.birthDate}
                        onChange={(e) => setData('birthDate', e.target.value)}
                        className="modalInput"
                        required
                    />
                    <select value={data.pool_id} onChange={(e) => setData('pool_id', e.target.value)} className="modalInput">
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

            {/* Manage Modal */}
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
                    <ButtonLink classNames="flex-1" href={`/kh-admin/fishes/measure?fish_id=${selectedFish?.id}`} variant="primary" label="Measure" />
                </div>
            </Modal>

            {/* Filter Modal */}
            <Modal isOpen={isFilterModalOpen} onClose={manageFilterModal} title="Filter Data">
                <div className="flex flex-wrap gap-3 py-4">
                    <input
                        className="modalInput"
                        type="text"
                        placeholder="Search by Code"
                        name="search_input"
                        value={filters.search_input}
                        onChange={handleChange}
                    />
                    <select className="modalInput" name="bloodline_id" value={filters.bloodline_id} onChange={handleChange}>
                        <option value="">All Bloodlines</option>
                        {bloodlines.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                    <select className="modalInput" name="variety_id" value={filters.variety_id} onChange={handleChange}>
                        <option value="">All Varieties</option>
                        {varieties.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.name}
                            </option>
                        ))}
                    </select>
                    <select className="modalInput" name="owner_id" value={filters.owner_id} onChange={handleChange}>
                        <option value="">All Owners</option>
                        {users.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name}
                            </option>
                        ))}
                    </select>
                    <select className="modalInput" name="pool_id" value={filters.pool_id} onChange={handleChange}>
                        <option value="">All Pools</option>
                        {pools.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleApply} className="mt-2 rounded bg-blue-500 px-4 py-2 text-white">
                        Apply Filters
                    </button>
                </div>
            </Modal>
        </AdminLayout>
    );
};

export default Fishes;
