import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import SecondaryHeader from '../../../components/SecondaryHeader';

const DiagnosisCreate = ({ fish, diseases }) => {
    const { fish_code: fishCodeFromURL } = usePage().props; // Get fish_code from Inertia props

    const { data, setData, post, processing, errors } = useForm({
        fish_id: fish?.id || '',
        fish_code: fish?.code || fishCodeFromURL || '', // Use fish_code from URL if missing
        disease_id: '',
        diagnosis_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form data:', data);
        console.log('Fish prop:', fish);
        console.log('Fish ID:', fish?.id);

        post(route('diagnosis.store'), { preserveScroll: true });
    };

    return (
        <AdminLayout>
            <div className="container mx-auto p-6">
                <div className="rounded-lg border-b-6 border-gray-900 bg-gray-700 p-6 shadow">
                    <SecondaryHeader title="New Diagnosis" />
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white">Fish Code:</label>
                            <input
                                type="text"
                                value={data.fish_code}
                                disabled
                                className="w-full rounded border-gray-700 bg-gray-800 p-2 text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white">Disease:</label>
                            <select
                                value={data.disease_id}
                                onChange={(e) => setData('disease_id', e.target.value)}
                                className="w-full rounded border-gray-700 bg-gray-800 p-2"
                            >
                                <option value="">Select Disease</option>
                                {diseases.map((disease) => (
                                    <option key={disease.id} value={disease.id}>
                                        {disease.name}
                                    </option>
                                ))}
                            </select>
                            {errors.disease_id && <p className="text-sm text-red-500">{errors.disease_id}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white">Diagnosis Date:</label>
                            <input
                                type="date"
                                value={data.diagnosis_date}
                                onChange={(e) => setData('diagnosis_date', e.target.value)}
                                className="w-full rounded border-gray-700 bg-gray-800 p-2"
                            />
                            {errors.diagnosis_date && <p className="text-sm text-red-500">{errors.diagnosis_date}</p>}
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Submit Diagnosis'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DiagnosisCreate;
