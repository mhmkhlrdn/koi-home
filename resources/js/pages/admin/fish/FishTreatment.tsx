import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';

const FishTreatment = () => {
    const { TreatmentID, FishID, FishTreated, TreatmentUsed }: any = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        fish_disease_id: FishTreated.id,
        treatment_id: TreatmentUsed.id,
        frequency: 0,
        dosage: 0,
        method: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('treatment.treated'));
        console.log(data);
    };

    return (
        <AdminLayout>
            <div className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                <MainHeader title="Apply Treatment to Fish" />
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Fish Details */}
                    <div className="rounded-lg border border-gray-900 bg-gray-800 p-6 shadow-md">
                        <h2 className="mb-4 border-b border-gray-500 pb-2 text-center text-xl font-semibold text-white">Fish Details</h2>
                        <p className="text-gray-300">
                            <span className="font-semibold text-white">Fish Code:</span> {FishTreated.fish.code}
                        </p>
                        <p className="mt-2 text-gray-300">
                            <span className="font-semibold text-white">Disease Name:</span> {FishTreated.disease.name}
                        </p>
                    </div>

                    {/* Treatment Details */}
                    <div className="rounded-lg border border-gray-900 bg-gray-800 p-6 shadow-md">
                        <h2 className="mb-4 border-b border-gray-500 pb-2 text-center text-xl font-semibold text-white">Medicine Details</h2>
                        <p className="text-gray-300">
                            <span className="font-semibold text-white">Medicine Used:</span> {TreatmentUsed.medicine.name} (
                            {TreatmentUsed.medicine.packaging}
                            {TreatmentUsed.medicine.measurement.name})
                        </p>
                        <p className="mt-2 text-gray-300">
                            <span className="font-semibold text-white">Stock Left:</span> {TreatmentUsed.medicine.amount}
                        </p>
                    </div>
                </div>

                {/* Treatment Application Section */}
                <form onSubmit={handleSubmit}>
                    <div className="mt-6 rounded-lg border border-gray-900 bg-gray-800 p-6 shadow-md md:col-span-2">
                        <h2 className="mb-4 border-b border-gray-500 pb-2 text-center text-xl font-semibold text-white">Treatment Application</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {/* Dosage Input */}
                            <div>
                                <label className="block text-gray-300">Dosage ({TreatmentUsed.medicine.measurement.name})</label>
                                <input
                                    onChange={(e) => setData('dosage', parseInt(e.target.value))}
                                    type="number"
                                    className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 p-2 text-white focus:border-gray-500 focus:ring-0"
                                    placeholder="Enter dosage"
                                />
                            </div>
                            {/* Frequency Input */}
                            <div>
                                <label className="block text-gray-300">Frequency (per day)</label>
                                <input
                                    onChange={(e) => setData('frequency', parseInt(e.target.value))}
                                    type="number"
                                    className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 p-2 text-white focus:border-gray-500 focus:ring-0"
                                    placeholder="Enter frequency"
                                />
                            </div>
                            {/* Method Combo Box */}
                            <div>
                                <label className="block text-gray-300">Method</label>
                                <select
                                    onChange={(e) => setData('method', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 p-2 text-white focus:border-gray-500 focus:ring-0"
                                >
                                    <option value="">Select method</option>
                                    <option value="oral">Oral</option>
                                    <option value="topical">Topical</option>
                                    <option value="immersion">Immersion</option>
                                    <option value="injection">Injection</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" disabled={processing} className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white">
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default FishTreatment;
