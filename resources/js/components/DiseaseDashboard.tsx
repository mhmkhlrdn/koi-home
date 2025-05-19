import { BarChart, LineChart, PieChart } from 'lucide-react';
import { Bar, CartesianGrid, Cell, Legend, Line, Pie, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function DiseaseDashboard({
    diseaseStats,
    loading,
    error,
    diseaseTimeRange,
    setDiseaseTimeRange,
    selectedDisease,
    setSelectedDisease,
}) {
    const renderDiseaseTimeChart = () => {
        let data, xKey, title;

        switch (diseaseTimeRange) {
            case 'daily':
                data = diseaseStats.daily_diagnoses || [];
                xKey = 'date';
                title = 'Fish Diagnoses Daily';
                break;
            case 'monthly':
                data = diseaseStats.monthly_diagnoses || [];
                xKey = 'month';
                title = 'Fish Diagnoses Monthly';
                break;
            case 'yearly':
                data = diseaseStats.yearly_diagnoses || [];
                xKey = 'year';
                title = 'Fish Diagnoses Yearly';
                break;
            default:
                data = [];
        }

        return (
            <div className="rounded-lg bg-gray-700 p-4 shadow">
                <h3 className="mb-4 text-lg font-semibold">{title}</h3>
                <div className="mb-2 flex justify-between">
                    <select
                        value={diseaseTimeRange}
                        onChange={(e) => setDiseaseTimeRange(e.target.value)}
                        className="rounded border bg-gray-700 px-2 py-1 text-sm"
                    >
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
                        <Bar dataKey="count" fill="#FF8042" name="Number of Diagnoses" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    };
    const renderDiseaseRatioChart = () => (
        <div className="rounded-lg bg-gray-700 p-4 shadow">
            <h3 className="mb-4 text-lg font-semibold">Disease Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={diseaseStats.disease_ratio}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="disease_name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {diseaseStats.disease_ratio.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );

    const renderDiseaseFrequencyChart = () => {
        if (!diseaseStats.disease_frequency.length) return null;

        return (
            <div className="rounded-lg bg-gray-700 p-4 shadow">
                <h3 className="mb-4 text-lg font-semibold">Disease Frequency Over Time</h3>
                <div className="mb-2">
                    <select
                        value={selectedDisease || ''}
                        onChange={(e) => setSelectedDisease(e.target.value)}
                        className="rounded border bg-gray-700 px-2 py-1 text-sm"
                    >
                        <option value="">Select a disease</option>
                        {diseaseStats.disease_frequency.map((disease, index) => (
                            <option key={index} value={index}>
                                {disease.disease_name}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedDisease !== null && (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={diseaseStats.disease_frequency[selectedDisease].data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" name="Cases" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        );
    };

    const renderRecoveryStatusChart = () => (
        <div className="rounded-lg bg-gray-700 p-4 shadow">
            <h3 className="mb-4 text-lg font-semibold">Recovery Status</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={diseaseStats.recovery_status}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="status"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {diseaseStats.recovery_status.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );

    const renderLongTermCases = () => (
        <div className="rounded-lg bg-gray-700 p-4 shadow">
            <h3 className="mb-4 text-lg font-semibold">Long-Term Cases ({diseaseStats.long_term_cases.length})</h3>
            <div className="max-h-64 overflow-y-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="px-4 py-2 text-left">Fish Code</th>
                            <th className="px-4 py-2 text-left">Disease</th>
                            <th className="px-4 py-2 text-left">Days Sick</th>
                            <th className="px-4 py-2 text-left">Treatments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diseaseStats.long_term_cases.map((caseItem, index) => (
                            <tr key={index} className="border-b border-gray-600 hover:bg-gray-600">
                                <td className="px-4 py-2">{caseItem.fish_code}</td>
                                <td className="px-4 py-2">{caseItem.disease_name}</td>
                                <td className="px-4 py-2">{caseItem.days_sick}</td>
                                <td className="px-4 py-2">{caseItem.treatments_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    if (loading) {
        return <div className="col-span-3 row-span-4 flex items-center justify-center">Loading disease data...</div>;
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
            <div className="col-span-3 row-span-1">{renderDiseaseTimeChart()}</div>
            <div className="col-span-1">{renderDiseaseRatioChart()}</div>
            <div className="col-span-1">{renderRecoveryStatusChart()}</div>
            <div className="col-span-1">{renderDiseaseFrequencyChart()}</div>
            <div className="col-span-3">{renderLongTermCases()}</div>
        </div>
    );
}
