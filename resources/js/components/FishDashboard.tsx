import { BarChart, PieChart } from 'lucide-react';
import { Bar, CartesianGrid, Cell, Legend, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function FishDashboard({ stats, loading, error, timeRange, setTimeRange }) {
    const renderTimeChart = () => {
        let data, xKey, title;

        switch (timeRange) {
            case 'daily':
                data = stats.daily || [];
                xKey = 'date';
                title = 'Fish Added/Born Daily (Last 30 Days)';
                break;
            case 'monthly':
                data = stats.monthly || [];
                xKey = 'month';
                title = 'Fish Added/Born Monthly (Last 12 Months)';
                break;
            case 'yearly':
                data = stats.yearly || [];
                xKey = 'year';
                title = 'Fish Added/Born Yearly (Last 5 Years)';
                break;
            default:
                data = [];
        }

        if (data.length === 0) {
            return (
                <div className="rounded-lg bg-gray-700 p-4 shadow">
                    <h3 className="mb-4 text-lg font-semibold">{title}</h3>
                    <p className="text-gray-500">No data available</p>
                </div>
            );
        }

        return (
            <div className="rounded-lg bg-gray-700 p-4 shadow">
                <h3 className="mb-4 text-lg font-semibold">{title}</h3>
                <div className="mb-2 flex justify-end">
                    <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="rounded border bg-gray-700 px-2 py-1 text-sm">
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" name="Number of Fish" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    };

    const renderPieChart = (data, title, dataKey, nameKey) => {
        if (!data || data.length === 0) {
            return (
                <div className="rounded-lg bg-gray-800 p-4 shadow">
                    <h3 className="mb-4 text-lg font-semibold">{title}</h3>
                    <p className="text-white">No data available</p>
                </div>
            );
        }

        return (
            <div className="rounded-lg bg-gray-700 p-4 shadow">
                <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey={dataKey}
                            nameKey={nameKey}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {data.map((index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    };

    if (loading) {
        return (
            <main className="m-4 grid grid-cols-3 grid-rows-4 gap-6">
                <div className="col-span-3 row-span-4 flex items-center justify-center">
                    <p>Loading dashboard data...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <div className="col-span-3 row-span-4 flex items-center justify-center">
                <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 grid-rows-4 gap-6">
            <div className="col-span-3 row-span-2">{renderTimeChart()}</div>
            <div className="col-span-1 row-span-2">
                {renderPieChart(
                    stats.genderRatio.map((item) => ({
                        name: item.gender,
                        value: item.count,
                    })),
                    'Gender Ratio',
                    'value',
                    'name',
                )}
            </div>
            <div className="col-span-1 row-span-2">
                {renderPieChart(
                    stats.varietyRatio.map((item) => ({
                        name: item.variety_name,
                        value: item.count,
                    })),
                    'Variety Ratio',
                    'value',
                    'name',
                )}
            </div>
            <div className="col-span-1 row-span-2 rounded-lg bg-gray-700 p-4 shadow">
                <h3 className="mb-4 text-lg font-semibold text-white">Quick Stats</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Total Fish</p>
                        <p className="text-2xl font-bold">{stats.total_fishes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
