import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

const DiseaseCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('diseases.store'));
    };

    return (
        <AdminLayout>
            <main className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 p-6">
                <MainHeader title="Add New Disease" />
                <div className="rounded-lg bg-gray-800 p-6 shadow">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white">Name:</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded border-gray-700 bg-gray-900 p-2 text-white"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Description:</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded border-gray-700 bg-gray-900 p-2 text-white"
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </AdminLayout>
    );
};

export default DiseaseCreate;
