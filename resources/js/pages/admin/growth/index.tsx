import MainHeader from '@/components/MainHeader';
import PaginationNav from '@/components/PaginationNav';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const GrowthPage = () => {
    const { growthData, filters, pagination, fishCodes, varieties, bloodlines } = usePage().props;
    const { data, setData, get } = useForm({
        search: filters.search || '',
        variety: filters.variety || '',
        bloodline: filters.bloodline || '',
    });

    const [showFilterModal, setShowFilterModal] = useState(false);
    const [expandedFish, setExpandedFish] = useState<string[]>([]);

    const toggleExpand = (code: string) => {
        setExpandedFish((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
    };
    console.log('growth data: ', growthData);

    const handleSubmit = () => {
        get(route('fish.growth'));
    };

    return (
        <AdminLayout>
            <main className="grid gap-6">
                <div className="col-span-4 rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader variant="filter" title="Fish Growth" onClickFilter={() => setShowFilterModal(true)} />
                    <div className="overflow-x-auto rounded-lg bg-[#485367] shadow-md">
                        <table className="w-full table-auto border-collapse overflow-hidden rounded-lg bg-gray-700 text-lg text-white">
                            <thead className="mx-auto bg-gray-800 text-left text-gray-300">
                                <tr className="mx-auto bg-gray-900 px-4 py-2 text-white">
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-center">Fish Code</th>
                                    <th className="px-4 py-2 text-center">Variety</th>
                                    <th className="px-4 py-2 text-center">Birthdate</th>
                                    <th className="px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {growthData.map((fish: any) => {
                                    const isExpanded = expandedFish.includes(fish.fish_code);
                                    return (
                                        <React.Fragment key={fish.fish_code}>
                                            <tr
                                                className="mx-auto cursor-pointer border-t bg-gray-600 text-center hover:bg-gray-500"
                                                onClick={() => toggleExpand(fish.fish_code)}
                                                title={`Click to ${isExpanded ? 'collapse' : 'expand'} record`}
                                            >
                                                <td className="px-4 py-2 text-left">{fish.id}</td>
                                                <td className="px-4 py-2 text-center">{fish.fish_code}</td>
                                                <td className="px-4 py-2 text-center">{fish.variety}</td>
                                                <td className="px-4 py-2 text-center">{fish.birthDate}</td>
                                                <td className="flex justify-center space-x-2 px-4 py-2">
                                                    <button
                                                        className="text-md rounded bg-green-600 px-3 py-1 hover:bg-green-700"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // replace with your route/modal logic
                                                            window.location.href = route('growth.create', { fish_id: fish.id });
                                                        }}
                                                    >
                                                        Add
                                                    </button>
                                                    <button
                                                        className="text-md rounded bg-yellow-500 px-3 py-1 hover:bg-yellow-600"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // replace with your route/modal logic
                                                            window.location.href = route('growth.edit', { fish_id: fish.id });
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>

                                            {isExpanded && (
                                                <tr>
                                                    <td colSpan={5} className="bg-gray-600 px-4 py-3">
                                                        <table className="w-full table-auto rounded bg-gray-500 text-white">
                                                            <thead className="text-left text-sm text-gray-300">
                                                                <tr>
                                                                    <th className="px-4 py-2">Date</th>
                                                                    <th className="px-4 py-2">Length</th>
                                                                    <th className="px-4 py-2">Weight</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {fish.records.map((record: any) => (
                                                                    <tr key={record.id} className="border-t border-gray-600">
                                                                        <td className="px-4 py-2">{record.recorded_at}</td>
                                                                        <td className={`px-4 py-1 ${trendClass(record.trend.length)}`}>
                                                                            {record.length} cm {renderTrendArrow(record.trend.length)}
                                                                        </td>
                                                                        <td className={`px-4 py-1 ${trendClass(record.trend.weight)}`}>
                                                                            {record.weight} g {renderTrendArrow(record.trend.weight)}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <PaginationNav links={pagination.links} />
                </div>

                <FilterModal
                    isOpen={showFilterModal}
                    onClose={() => setShowFilterModal(false)}
                    search={data.search}
                    setSearch={(val: string) => setData('search', val)}
                    variety={data.variety}
                    setVariety={(val: string) => setData('variety', val)}
                    bloodline={data.bloodline}
                    setBloodline={(val: string) => setData('bloodline', val)}
                    fishCodes={fishCodes}
                    varieties={varieties}
                    bloodlines={bloodlines}
                    onSubmit={handleSubmit}
                />
            </main>
        </AdminLayout>
    );
};

// Helpers
const FilterModal = ({
    isOpen,
    onClose,
    search,
    setSearch,
    variety,
    setVariety,
    bloodline,
    setBloodline,
    onSubmit,
    fishCodes,
    varieties,
    bloodlines,
}: any) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-lg bg-gray-700 p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Filter Fish Growth</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                        onClose();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-white">Fish Code</label>
                        <select
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="mt-1 w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:outline-none"
                        >
                            <option value="">All</option>
                            {fishCodes.map((fish: any) => (
                                <option key={fish.code} value={fish.code}>
                                    {fish.code}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Variety</label>
                        <select
                            value={variety}
                            onChange={(e) => setVariety(e.target.value)}
                            className="mt-1 w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:outline-none"
                        >
                            <option value="">All</option>
                            {varieties.map((v: any) => (
                                <option key={v.name} value={v.name}>
                                    {v.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Bloodline</label>
                        <select
                            value={bloodline}
                            onChange={(e) => setBloodline(e.target.value)}
                            className="mt-1 w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:outline-none"
                        >
                            <option value="">All</option>
                            {bloodlines.map((b: any) => (
                                <option key={b.name} value={b.name}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4 flex justify-end gap-2 border-t border-gray-600 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded bg-gray-600 px-4 py-2 text-sm text-white transition hover:bg-gray-800"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700">
                            Apply Filter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const trendClass = (trend: string) => {
    return trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : '';
};

const renderTrendArrow = (trend: string) => {
    if (trend === 'up') return <span className="ml-1 text-green-400">↑</span>;
    if (trend === 'down') return <span className="ml-1 text-red-400">↓</span>;
    return null;
};

export default GrowthPage;
