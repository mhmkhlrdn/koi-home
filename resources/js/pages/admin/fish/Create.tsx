import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const Create = () => {
    const { bloodlines, varieties, pools } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        code: '',
        bloodline_id: 0,
        variety_id: 0,
        pool_id: 0,
        birthDate: '',
        recordedDate: '',
        gender: '',
        size: '',
        image: null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setData('image', file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setData('image', null);
            setPreviewUrl(null);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            ...data,
            size: parseFloat(data.size.toString()) || 0,
        };

        console.log('Submitting form data:', payload);
        post(route('fishes.store'), payload);
    };

    return (
        <AdminLayout>
            <main className="mainWrapper">
                <MainHeader title="Create New Fish" />
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Fish Table Data */}
                        <div className="flex flex-col rounded-lg bg-gray-600 p-4">
                            <label className="text-lg font-bold text-white">Fish Code</label>
                            <input
                                required
                                className="rounded-lg bg-gray-800 px-4 py-2"
                                onChange={(e) => setData('code', e.target.value)}
                                type="text"
                            />
                            <label className="text-lg font-bold text-white">Fish Bloodline</label>
                            <select
                                required
                                className="rounded-lg bg-gray-800 px-4 py-2"
                                onChange={(e) => setData('bloodline_id', parseInt(e.target.value))}
                            >
                                <option value=""></option>
                                {bloodlines.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                            <label className="text-lg font-bold text-white">Fish Variety</label>
                            <select
                                required
                                className="rounded-lg bg-gray-800 px-4 py-2"
                                onChange={(e) => setData('variety_id', parseInt(e.target.value))}
                            >
                                <option value=""></option>
                                {varieties.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                            <label className="text-lg font-bold text-white">Pool</label>
                            <select
                                required
                                className="rounded-lg bg-gray-800 px-4 py-2"
                                onChange={(e) => setData('pool_id', parseInt(e.target.value))}
                            >
                                <option value=""></option>
                                {pools.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                            <label className="text-lg font-bold text-white">Birth Date</label>
                            <input
                                required
                                className="rounded-lg bg-gray-800 px-4 py-2"
                                onChange={(e) => setData('birthDate', e.target.value)}
                                type="date"
                            />
                            <label className="text-lg font-bold text-white">Gender</label>
                            <select required className="rounded-lg bg-gray-800 px-4 py-2" onChange={(e) => setData('gender', e.target.value)}>
                                <option value="unknown">Unknown</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        {/* Fish Growth Table Data */}
                        <div className="flex flex-col rounded-lg bg-gray-600 p-4">
                            <label className="text-lg font-bold text-white">Fish Size (cm)</label>
                            <input
                                required
                                type="text"
                                inputMode="decimal"
                                className="rounded-lg bg-gray-800 px-4 py-2 text-white"
                                value={data.size}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*\.?\d*$/.test(value)) {
                                        setData('size', value);
                                    }
                                }}
                            />

                            <label className="text-lg font-bold text-white">Recorded Date</label>
                            <input
                                required
                                className="rounded-lg bg-gray-800 px-4 py-2"
                                onChange={(e) => setData('recordedDate', e.target.value)}
                                type="date"
                            />
                            <label className="text-lg font-bold text-white">Fish Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="rounded-lg bg-gray-800 px-4 py-2 text-white"
                                onChange={handleImageChange}
                            />
                            {previewUrl && (
                                <div className="mt-4">
                                    <label className="font-semibold text-white">Preview:</label>
                                    <img src={previewUrl} alt="Fish Preview" className="mt-2 h-auto max-w-full rounded-lg border border-gray-400" />
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" disabled={processing} className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white">
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </main>
        </AdminLayout>
    );
};

export default Create;
