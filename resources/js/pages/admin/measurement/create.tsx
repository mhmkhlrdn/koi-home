import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import SecondaryHeader from '../../../components/SecondaryHeader';

const MeasurementCreate = ({ fish }) => {
    const { fish_code: fishCodeFromURL } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        fish_id: fish?.id || '',
        fish_code: fish?.code || fishCodeFromURL || '',
        length: '',
        weight: '',
        recorded_at: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('measurement.store'), { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <div className="container mx-auto p-6">
                <div className="rounded-lg border-b-6 border-gray-900 bg-gray-700 p-6 shadow">
                    <SecondaryHeader title="Record New Measurement" />

                    {/* Fish Details */}
                    <div className="mt-6 grid gap-6 text-white">
                        <div className="rounded-lg bg-gray-900 p-4">
                            <h2 className="mb-4 border-b border-gray-600 pb-2 text-xl font-semibold">Fish Info</h2>

                            <div className="grid gap-x-8 gap-y-2 text-lg md:grid-cols-2">
                                {/* Left column */}
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-medium">Code:</span> {fish.code}
                                    </p>
                                    <p>
                                        <span className="font-medium">Gender:</span> {fish.gender}
                                    </p>
                                    <p>
                                        <span className="font-medium">Birth Date:</span> {fish.birthDate}
                                    </p>
                                </div>

                                {/* Right column with top border */}
                                <div className="space-y-2 border-t border-gray-700 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
                                    <p>
                                        <span className="font-medium">Bloodline:</span> {fish.bloodline.name}
                                    </p>
                                    <p>
                                        <span className="font-medium">Variety:</span> {fish.variety.name}
                                    </p>
                                    <p>
                                        <span className="font-medium">Pool:</span> {fish.pool.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Growth Records */}
                    </div>

                    {/* Measurement Form */}
                    <div className="mt-10 text-white">
                        <h2 className="mb-4 border-b border-gray-600 pb-2 text-lg font-semibold">New Measurement</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-lg font-medium">Length (cm)</label>
                                    <input
                                        type="number"
                                        value={data.length}
                                        onChange={(e) => setData('length', e.target.value)}
                                        className="w-full rounded border border-gray-600 bg-gray-800 px-2 py-4 text-white"
                                    />
                                    {errors.length && <p className="text-md text-red-400">{errors.length}</p>}
                                </div>

                                <div>
                                    <label className="mb-1 block text-lg font-medium">Weight (g)</label>
                                    <input
                                        type="number"
                                        value={data.weight}
                                        onChange={(e) => setData('weight', e.target.value)}
                                        className="w-full rounded border border-gray-600 bg-gray-800 px-2 py-4 text-white"
                                    />
                                    {errors.weight && <p className="text-md text-red-400">{errors.weight}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-lg font-medium">Recorded At</label>
                                <input
                                    type="datetime-local"
                                    value={data.recorded_at}
                                    onChange={(e) => setData('recorded_at', e.target.value)}
                                    className="w-full rounded border border-gray-600 bg-gray-800 px-2 py-4 text-white"
                                />
                                {errors.recorded_at && <p className="text-md text-red-400">{errors.recorded_at}</p>}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="mb-6 rounded bg-gray-800 px-6 py-2 font-medium text-white hover:bg-gray-600 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Submit Measurement'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="rounded-lg bg-gray-900 p-4 shadow-inner">
                        <h2 className="mb-4 border-b border-gray-600 pb-2 text-xl font-semibold">Growth Records</h2>
                        {fish.growth_records?.length > 0 ? (
                            <ul className="space-y-3">
                                {fish.growth_records.map((record) => (
                                    <li key={record.id} className="flex items-center space-x-3">
                                        <img src={`/${record.photoUrl}`} alt="Growth" className="h-12 w-12 rounded object-cover shadow" />
                                        <div className="text-lg">
                                            <p>
                                                <span className="font-medium">Length:</span> {record.length} cm
                                            </p>
                                            <p>
                                                <span className="font-medium">Weight:</span> {record.weight} g
                                            </p>
                                            <p className="text-md text-gray-400"> {record.recorded_at}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-lg text-gray-400">No growth records yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default MeasurementCreate;
