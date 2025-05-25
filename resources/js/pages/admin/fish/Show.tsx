import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface FishShowProps {
    fish: {
        id: number;
        code: string;
        gender: string;
        birthDate: string;
        user: { name: string };
        bloodline: { name: string };
        variety: { name: string };
        pool: { name: string };
        growthRecords: Array<{
            length: number;
            weight: number;
            recorded_at: string;
        }>;
    };
    growthChartData: Array<{
        date: string;
        length: number;
        weight: number;
        photo?: string | null;
    }>;
}

export default function FishShow({ fish, growthChartData }: FishShowProps) {
    return (
        <AdminLayout>
            <div className="min-h-screen">
                <Head title={`Fish ${fish.code}`} />

                <div className="mx-auto rounded-lg bg-gray-700 p-4 sm:p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <MainHeader title={`${fish.code}`} />
                        <div className="text-md mt-2 flex items-center space-x-4 px-4 text-white">
                            <span>ID: {fish.id}</span>
                            <span>Gender: {fish.gender}</span>
                            <span>Birth Date: {new Date(fish.birthDate).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Basic Info Card */}
                    <div className="mb-8 rounded-2xl border border-gray-600 bg-gray-800 p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold text-white">Basic Information</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <InfoBlock label="Bloodline" value={fish.bloodline.name} />
                            <InfoBlock label="Variety" value={fish.variety.name} />
                            <InfoBlock label="Pool" value={fish.pool.name} />
                            <InfoBlock label="Inputted By" value={fish.user.name} />
                        </div>
                    </div>

                    {/* Growth Chart */}
                    <div className="mb-8 rounded-2xl border border-gray-600 bg-gray-800 p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800">Growth History</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={growthChartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="date" stroke="#6b7280" />
                                    <YAxis
                                        yAxisId="left"
                                        stroke="#6b7280"
                                        label={{ value: 'Length (cm)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        stroke="#6b7280"
                                        label={{ value: 'Weight (g)', angle: 90, position: 'insideRight', fill: '#6b7280' }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#d1d5db', color: '#111827' }}
                                        labelStyle={{ color: '#6b7280' }}
                                    />
                                    <Legend />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="length"
                                        stroke="#3D76E7FF"
                                        name="Length (cm)"
                                        dot={{ stroke: '#6b7280', strokeWidth: 1 }}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="weight"
                                        stroke="#EE6F6FFF"
                                        name="Weight (g)"
                                        dot={{ stroke: '#6b7280', strokeWidth: 1 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            {/* Photo Gallery */}
                        </div>
                    </div>
                    {growthChartData.some((item) => item.photo) && (
                        <div className="mt-6">
                            <h3 className="mb-2 text-lg font-semibold text-white">Growth Record Photos</h3>
                            <div className="flex flex-wrap gap-4 overflow-x-auto">
                                {growthChartData.map((item, index) =>
                                    item.photo ? (
                                        <div key={index} className="w-52 flex-shrink-0 rounded-lg border border-gray-600 bg-gray-700 p-2">
                                            <img src={`/${item.photo}`} alt={`Growth record on ${item.date}`} className="h-full w-full rounded" />
                                            <div className="text-md mt-1 mt-4 text-gray-300">{new Date(item.date).toLocaleDateString()}</div>
                                        </div>
                                    ) : null,
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-gray-800 bg-gray-700 px-4 py-3 transition hover:bg-gray-600">
            <h3 className="text-sm font-medium text-gray-200">{label}</h3>
            <p className="mt-1 text-base text-white">{value}</p>
        </div>
    );
}
