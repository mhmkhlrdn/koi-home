import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import MedicineImageUpload from './../../components/MedicineImageUpload';

const medicines = () => {
    const { medicinesInStock, medicinesOutOfStock, medicineType, measurements, types }: any = usePage().props;
    useEffect(() => {
        console.log('medicines in stock: ', medicinesInStock);
        console.log('medicines out stock: ', medicinesOutOfStock);
        console.log('medicines types: ', medicineType);
    });
    const manageModal = (modalName: string) => {
        setModals((prev) => ({
            ...prev,
            [modalName]: !prev[modalName],
        }));
    };
    const [modals, setModals] = useState({
        modalCreate: false,
        modalFilter: false,
        modalEdit: false,
        modalDelete: false,
    });
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        amount: 0,
        measurement_id: 0,
        packaging: 0,
        instruction: '',
        type_id: 0,
        image: null,
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('medicine.store'));
        manageModal('modalCreate');
    };

    const handleImage = (data) => {
        setData('image', data);
    };
    return (
        <AdminLayout>
            <main className="grid grid-cols-3 gap-4 rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4 2xl:grid-cols-5">
                <MainHeader
                    variant="primary"
                    title="Medicines In Stock"
                    onClickCreate={() => manageModal('modalCreate')}
                    styleClass="col-span-3 2xl:col-span-5"
                />
                {medicinesInStock.map((stocked: any) => (
                    <div className="align-center justify-center rounded-lg bg-gray-900 p-4">
                        <img className="mx-auto max-w-48 rounded-lg" src={`/${stocked.image_url}`} alt="" />
                        <div className="mt-2 text-center">
                            <h1 className="rounded-md bg-gray-800 p-2" key={stocked.id}>
                                {stocked.name}
                            </h1>
                        </div>
                        <div className="px-2 pt-2">
                            <label>
                                Amount in stock: {stocked.amount} <br />
                            </label>
                            <label>
                                Total left: {stocked.totalLeft}
                                {stocked.measurement.name} <br />
                            </label>
                            <label>
                                Packaging: {stocked.packaging}
                                {stocked.measurement.name} <br />
                            </label>
                            <label>
                                Type:{' '}
                                {medicineType
                                    .filter((t: any) => t.medicine_id === stocked.id)
                                    .map((t: any) => t.type.type)
                                    .join(', ') || 'No Type'}
                            </label>
                        </div>
                        <div className="align-self-end flex justify-center">
                            <button type="button" className="m-2 rounded-md bg-gray-600 px-4 py-2 font-semibold hover:bg-gray-500">
                                Update Stock
                            </button>
                        </div>
                    </div>
                ))}
            </main>
            {modals.modalCreate && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="w-1/2 rounded-lg bg-[#060E1C] p-6 shadow-lg">
                        <div className="flex justify-between">
                            <h2 className="text-xl font-semibold">Add New Medicine</h2>
                            <button onClick={() => manageModal('modalCreate')} className="text-gray-500 hover:text-gray-700">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-md font-bold text-white">Medicine Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-md font-bold text-white">Amount</label>
                                    <input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', parseInt(e.target.value))}
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-md font-bold text-white">Measurement</label>
                                    <select
                                        value={data.measurement_id}
                                        onChange={(e) => setData('measurement_id', parseInt(e.target.value))}
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                    >
                                        <option value="">Select measurement</option>
                                        {measurements.map((m: any) => (
                                            <option key={m.id} value={m.id}>
                                                {m.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-md font-bold text-white">Packaging</label>
                                    <input
                                        type="number"
                                        value={data.packaging}
                                        onChange={(e) => setData('packaging', parseInt(e.target.value))}
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="text-md font-bold text-white">Type</label>
                                    <select
                                        value={data.type_id}
                                        onChange={(e) => setData('type_id', parseInt(e.target.value))}
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                    >
                                        <option value="">Select type of medicine</option>
                                        {types.map((m: any) => (
                                            <option key={m.id} value={m.id}>
                                                {m.type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-md font-bold text-white">Instruction</label>
                                    <textarea
                                        value={data.instruction}
                                        onChange={(e) => setData('instruction', e.target.value)}
                                        className="w-full rounded-lg bg-gray-800 p-2 text-white"
                                    />
                                </div>
                                <div>
                                    <MedicineImageUpload Img={handleImage} />
                                </div>

                                <div className="flex justify-end">
                                    <button type="submit" disabled={processing} className="rounded-lg bg-blue-500 px-4 py-2 text-white">
                                        {processing ? 'Saving...' : 'Save'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default medicines;
