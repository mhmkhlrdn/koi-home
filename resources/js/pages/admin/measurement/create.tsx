import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import FishImageUpload from '../../../components/FishImageUpload';
import SecondaryHeader from '../../../components/SecondaryHeader';

const MeasurementCreate = ({ fish }) => {
    const { fish_code: fishCodeFromURL } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        fish_id: fish?.id || '',
        fish_code: fish?.code || fishCodeFromURL || '',
        length: '',
        weight: '',
        recorded_at: '',
        image: '',
    });

    const handleImage = (data) => {
        setData('image', data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('measurement.store'), { preserveScroll: true, onSuccess: () => reset() });
        console.log(data);
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

                            <FishImageUpload Img={handleImage} />

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
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {fish.growth_records.map((record) => (
                                    <div key={record.id} className="flex flex-col rounded-lg border border-gray-700 p-4">
                                        <div className="aspect-[9/16] overflow-hidden rounded">
                                            <img src={`/${record.photoUrl}`} alt="Growth Record" className="h-full w-full object-cover" />
                                        </div>
                                        <div className="mt-3 space-y-1">
                                            <p className="text-lg">
                                                <span className="font-medium">Length:</span> {record.length} cm
                                            </p>
                                            <p className="text-lg">
                                                <span className="font-medium">Weight:</span> {record.weight} g
                                            </p>
                                            <p className="text-sm text-gray-400">{new Date(record.recorded_at).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
