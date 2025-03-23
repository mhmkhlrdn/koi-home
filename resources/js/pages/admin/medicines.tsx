import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

const medicines = () => {
    const { medicinesInStock, medicinesOutOfStock, medicineType } = usePage().props;
    useEffect(() => {
        console.log('medicines in stock: ', medicinesInStock);
        console.log('medicines out stock: ', medicinesOutOfStock);
        console.log('medicines types: ', medicineType);
    });
    return (
        <AdminLayout>
            <main className="grid grid-cols-5 gap-4 rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                <MainHeader variant="primary" title="Medicines In Stock" styleClass="col-span-5" />
                {medicinesInStock.map((stocked) => (
                    <div className="rounded-lg bg-gray-900 p-4">
                        <img className="rounded-lg" src={`/images/${stocked.id}.jpg`} alt="" />
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
                                Packaging: {stocked.packaging}
                                {stocked.measurement.name} <br />
                            </label>
                            <label>
                                Type:{' '}
                                {
                                    medicineType
                                        .filter((t) => t.medicine_id === stocked.id) // Filter types that match the stocked medicine
                                        .map((t) => t.type.type) // Extract the type name
                                        .join(', ') || 'No Type' // Join if multiple types exist, otherwise "No Type"
                                }
                            </label>
                        </div>
                    </div>
                ))}
            </main>
        </AdminLayout>
    );
};

export default medicines;
