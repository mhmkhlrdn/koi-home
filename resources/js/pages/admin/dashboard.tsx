import AdminLayout from '@/layouts/AdminLayout';
import axios from 'axios';
import { ArrowDown, ArrowUp, AlertTriangle, Droplet, TrendingUp, Cross } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

// Initialize with proper structure
const initialStats = {
    daily: [],
    monthly: [],
    yearly: [],
    total_fishes: 0,
    genderRatio: [],
    varietyRatio: [],
};

const initialDiseaseStats = {
    daily_diagnoses: [],
    monthly_diagnoses: [],
    yearly_diagnoses: [],
    disease_ratio: [],
    recovery_status: [],
    long_term_cases: [],
    disease_frequency: [],
};

const DashboardPage = () => {
    const [diseaseStats, setDiseaseStats] = useState(initialDiseaseStats);
    const [diseaseTimeRange, setDiseaseTimeRange] = useState('daily');
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [stats, setStats] = useState(initialStats);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState('daily');
    const [growthStats, setGrowthStats] = useState({
        inactive_fish: [],
        shrinking_fish: [],
    });
    const [medicineStats, setMedicineStats] = useState({
        daily_usage: [],
        monthly_usage: [],
        yearly_usage: [],
        top_medicines: [],
    });
    const [medicineTimeRange, setMedicineTimeRange] = useState('daily');

    const formatDateData = (data, key) => {
        if (!data) return [];

        const formatted = data.map((item) => ({ ...item, [key]: item[key] }));

        return formatted.sort((a, b) => {
            if (key === 'month') {
                const [aYear, aMonth] = a[key].split('-');
                const [bYear, bMonth] = b[key].split('-');
                return bYear - aYear || bMonth - aMonth;
            }
            return new Date(b[key]) - new Date(a[key]);
        });
    };
    const fetchMedicineData = async () => {
        try {
            const response = await axios.get('/kh-admin/dashboard/medicine-usage');
            setMedicineStats(response.data);
        } catch (err) {
            console.error('Error fetching medicine data:', err);
        }
    };

    const fetchGrowthData = async () => {
        try {
            const response = await axios.get('/kh-admin/dashboard/growth-statistics');
            setGrowthStats(response.data);
        } catch (err) {
            console.error('Error fetching growth data:', err);
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch both fish and disease data in parallel
                const [fishResponse, diseaseResponse] = await Promise.all([
                    axios.get('/kh-admin/dashboard/fish-statistics'),
                    axios.get('/kh-admin/dashboard/disease-statistics'),
                    await fetchGrowthData(),
                    await fetchMedicineData(),
                ]);

                // Process fish data
                setStats({
                    daily: formatDateData(fishResponse.data.daily, 'date'),
                    monthly: formatDateData(fishResponse.data.monthly, 'month'),
                    yearly: formatDateData(fishResponse.data.yearly, 'year'),
                    total_fishes: fishResponse.data.total_fishes || 0,
                    genderRatio: fishResponse.data.gender_ratio || [],
                    varietyRatio: fishResponse.data.variety_ratio || [],
                });

                // Process disease data
                setDiseaseStats({
                    daily_diagnoses: formatDateData(diseaseResponse.data.daily_diagnoses, 'date'),
                    monthly_diagnoses: formatDateData(diseaseResponse.data.monthly_diagnoses, 'month'),
                    yearly_diagnoses: formatDateData(diseaseResponse.data.yearly_diagnoses, 'year'),
                    disease_ratio: diseaseResponse.data.disease_ratio || [],
                    recovery_status: diseaseResponse.data.recovery_status || [],
                    long_term_cases: diseaseResponse.data.long_term_cases || [],
                    disease_frequency: diseaseResponse.data.disease_frequency || [],
                });
            } catch (err) {
                console.error('API Error:', err);
                setError(err.response?.data?.message || 'Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

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
                <div className="rounded-lg bg-gray-800 p-4 shadow">
                    <h3 className="mb-4 text-lg font-semibold">{title}</h3>
                    <p className="text-gray-500">No data available</p>
                </div>
            );
        }

        return (
            <div className="rounded-lg bg-gray-800 p-4 shadow">
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

    const renderMedicineUsageChart = () => {
        let data, xKey, title;

        switch (medicineTimeRange) {
            case 'daily':
                data = medicineStats.daily_usage || [];
                xKey = 'date';
                title = 'Daily Medicine Usage';
                break;
            case 'monthly':
                data = medicineStats.monthly_usage || [];
                xKey = 'month';
                title = 'Monthly Medicine Usage';
                break;
            case 'yearly':
                data = medicineStats.yearly_usage || [];
                xKey = 'year';
                title = 'Yearly Medicine Usage';
                break;
            default:
                data = [];
        }

        // Prepare chart data
        const chartData = data.map((period) => ({
            date: period[xKey],
            treatments: period.treatments,
            ...Object.fromEntries(Object.entries(period.medicines).map(([id, med]) => [`${med.name} (${med.unit})`, med.dosage])),
        }));

        const medicineColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

        return (
            <div className="rounded-lg bg-gray-800 p-4 shadow">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Cross className="h-5 w-5 text-blue-500" />
                    {title}
                </h3>
                <div className="mb-2 flex justify-between">
                    <select
                        value={medicineTimeRange}
                        onChange={(e) => setMedicineTimeRange(e.target.value)}
                        className="rounded border bg-gray-700 px-2 py-1 text-sm"
                    >
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="treatments" name="Treatments" fill="#82ca9d" />
                        {medicineStats.top_medicines.map((medicine, index) => (
                            <Bar
                                yAxisId="right"
                                key={medicine.name}
                                dataKey={`${medicine.name} (${medicine.unit})`}
                                name={`${medicine.name} Usage`}
                                fill={medicineColors[index % medicineColors.length]}
                            />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    };

    const renderTopMedicines = () => (
        <div className="rounded-lg bg-gray-800 p-4 shadow">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Top Medicines Used
            </h3>
            <div className="space-y-3">
                {medicineStats.top_medicines.map((medicine, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Droplet className="h-4 w-4 text-blue-500" />
                            <span>{medicine.name}</span>
                        </div>
                        <div className="font-mono">
                            {medicine.total_dosage} {medicine.unit}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

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
            <div className="rounded-lg bg-gray-800 p-4 shadow">
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
                            {data.map((entry, index) => (
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
            <AdminLayout>
                <main className="m-4 grid grid-cols-3 grid-rows-4 gap-6">
                    <div className="col-span-3 row-span-4 flex items-center justify-center">
                        <p>Loading dashboard data...</p>
                    </div>
                </main>
            </AdminLayout>
        );
    }

    const renderInactiveFish = () => (
        <div className="rounded-lg bg-gray-800 p-4 shadow">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Fish Needing Measurements
            </h3>
            <div className="max-h-64 overflow-y-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="px-4 py-2 text-left">Fish Code</th>
                            <th className="px-4 py-2 text-left">Last Measurement</th>
                            <th className="px-4 py-2 text-left">Days Since</th>
                        </tr>
                    </thead>
                    <tbody>
                        {growthStats.inactive_fish.map((fish, index) => (
                            <tr key={index} className="border-b border-gray-600 hover:bg-gray-600">
                                <td className="px-4 py-2">{fish.code}</td>
                                <td className="px-4 py-2">{fish.last_measurement || 'Never measured'}</td>
                                <td className="px-4 py-2">{fish.days_since_measurement}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderShrinkingFish = () => (
        <div className="rounded-lg bg-gray-800 p-4 shadow">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <ArrowDown className="h-5 w-5 text-red-500" />
                Fish With Decreasing Size
            </h3>
            <div className="max-h-64 overflow-y-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="px-4 py-2 text-left">Fish Code</th>
                            <th className="px-4 py-2 text-left">Length Change</th>
                            <th className="px-4 py-2 text-left">Weight Change</th>
                            <th className="px-4 py-2 text-left">Last Measured</th>
                        </tr>
                    </thead>
                    <tbody>
                        {growthStats.shrinking_fish.map((fish, index) => (
                            <tr key={index} className="border-b border-gray-600 hover:bg-gray-600">
                                <td className="px-4 py-2">{fish.code}</td>
                                <td className={`px-4 py-2 ${fish.change_percentage.length < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                    {fish.change_percentage.length}%
                                    {fish.change_percentage.length < 0 ? (
                                        <ArrowDown className="ml-1 inline h-4 w-4" />
                                    ) : (
                                        <ArrowUp className="ml-1 inline h-4 w-4" />
                                    )}
                                </td>
                                <td className={`px-4 py-2 ${fish.change_percentage.weight < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                    {fish.change_percentage.weight}%
                                    {fish.change_percentage.weight < 0 ? (
                                        <ArrowDown className="ml-1 inline h-4 w-4" />
                                    ) : (
                                        <ArrowUp className="ml-1 inline h-4 w-4" />
                                    )}
                                </td>
                                <td className="px-4 py-2">{fish.last_measured}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Add these chart rendering functions
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
            <div className="rounded-lg bg-gray-800 p-4 shadow">
                <h3 className="mb-4 text-lg font-semibold">{title}</h3>
                <div className="mb-2 flex justify-between">
                    <select
                        value={diseaseTimeRange}
                        onChange={(e) => setDiseaseTimeRange(e.target.value)}
                        className="rounded border bg-gray-800 px-2 py-1 text-sm"
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

    if (error) {
        return (
            <AdminLayout>
                <main className="m-4 grid grid-cols-3 grid-rows-4 gap-6">
                    <div className="col-span-3 row-span-4 flex items-center justify-center">
                        <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
                            <strong>Error:</strong> {error}
                        </div>
                    </div>
                </main>
            </AdminLayout>
        );
    }

    const renderDiseaseRatioChart = () => (
        <div className="rounded-lg bg-gray-800 p-4 shadow">
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
            <div className="rounded-lg bg-gray-800 p-4 shadow">
                <h3 className="mb-4 text-lg font-semibold">Disease Frequency Over Time</h3>
                <div className="mb-2">
                    <select
                        value={selectedDisease || ''}
                        onChange={(e) => setSelectedDisease(e.target.value)}
                        className="rounded border bg-gray-800 px-2 py-1 text-sm"
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
        <div className="rounded-lg bg-gray-800 p-4 shadow">
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
        <div className="rounded-lg bg-gray-800 p-4 shadow">
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

    return (
        <AdminLayout>
            <main className="m-4 grid gap-4">
                {/* Time-based chart (takes full width) */}
                <div className="grid grid-cols-3 gap-6 rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <div className="col-span-3">{renderTimeChart()}</div>
                    {/* Gender ratio pie chart */}
                    <div className="col-span-1">
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
                    {/* Variety ratio pie chart */}
                    <div className="col-span-1">
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
                    {/* Quick stats */}
                    <div className="col-span-1 rounded-lg bg-gray-800 p-4 shadow">
                        <h3 className="mb-4 text-lg font-semibold text-white">Quick Stats</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">Total Fish</p>
                                <p className="text-2xl font-bold">{stats.total_fishes}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6 rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <div className="col-span-3 row-span-1">{renderDiseaseTimeChart()}</div>
                    <div className="col-span-1">{renderDiseaseRatioChart()}</div>
                    <div className="col-span-1">{renderRecoveryStatusChart()}</div>
                    <div className="col-span-1">{renderDiseaseFrequencyChart()}</div>
                    <div className="col-span-3">{renderLongTermCases()}</div>
                </div>
                <div className="grid grid-rows-2 gap-6 rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <div className="row-span-1">{renderInactiveFish()}</div>
                    <div className="row-span-1">{renderShrinkingFish()}</div>
                </div>

                <div className="grid grid-rows-1 gap-6 rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    {/* Medicine Usage - Full width */}
                    <div className="col-span-3">{renderMedicineUsageChart()}</div>

                    {/* Top Medicines - Side section */}
                    <div className="col-span-3">{renderTopMedicines()}</div>
                </div>
            </main>
        </AdminLayout>
    );
};

export default DashboardPage;
