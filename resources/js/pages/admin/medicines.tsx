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
                    <div className="bg-gray-900 text-center">
                        <img src={`/images/${stocked.id}.jpg`} alt="" />
                        <h1 key={stocked.id}>{stocked.name}</h1>
                    </div>
                ))}
            </main>
        </AdminLayout>
    );
};

export default medicines;
