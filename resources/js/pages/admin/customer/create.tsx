import MainHeader from '@/components/MainHeader';
import AddressSelect from '@/components/ui/AddressSelect';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

const CreateCustomer = () => {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address_line_one: '',
        address_line_two: '',
        city: '',
        province: '',
        postal_code: '',
        country: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('customer.store'));
    };

    return (
        <AdminLayout>
            <main className="rounded-2xl border-b-6 border-gray-900 bg-gray-700 p-6">
                <MainHeader title="Add New Customer" />
                <div className="rounded-lg bg-gray-600 p-6 shadow">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="mt-1">
                                <label className="block text-sm font-medium text-white">First Name:</label>
                                <input
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    className="mt-1 w-full rounded border-gray-700 bg-gray-800 p-2 text-white"
                                />
                                {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
                            </div>
                            <div className="mt-1">
                                <label className="block text-sm font-medium text-white">Last Name:</label>
                                <input
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    className="mt-1 w-full rounded border-gray-700 bg-gray-800 p-2 text-white"
                                />
                                {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
                            </div>
                            <div className="mt-1">
                                <label className="block text-sm font-medium text-white">Email:</label>
                                <input
                                    type="text"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 w-full rounded border-gray-700 bg-gray-800 p-2 text-white"
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>
                            <div className="mt-1">
                                <label className="block text-sm font-medium text-white">Phone:</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 w-full rounded border-gray-700 bg-gray-800 p-2 text-white"
                                />
                                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                            </div>
                            <div className="mt-1">
                                <label className="block text-sm font-medium text-white">Postal Code:</label>
                                <input
                                    type="text"
                                    value={data.postal_code}
                                    onChange={(e) => setData('postal_code', e.target.value)}
                                    className="mt-1 w-full rounded border-gray-700 bg-gray-800 p-2 text-white"
                                />
                                {errors.postal_code && <p className="text-sm text-red-500">{errors.postal_code}</p>}
                            </div>
                        </div>
                        <div className="mt-1">
                            <div>
                                <label className="block text-sm font-medium text-white">Address Line One:</label>
                                <input
                                    type="text"
                                    value={data.address_line_one}
                                    onChange={(e) => setData('address_line_one', e.target.value)}
                                    className="mt-1 w-full rounded border-gray-700 bg-gray-800 p-2 text-white"
                                />
                                {errors.address_line_one && <p className="text-sm text-red-500">{errors.address_line_one}</p>}
                            </div>
                            <div className="mt-1">
                                <label className="block text-sm font-medium text-white">Address Line Two:</label>
                                <input
                                    type="text"
                                    value={data.address_line_two}
                                    onChange={(e) => setData('address_line_two', e.target.value)}
                                    className="mt-1 w-full rounded border-gray-700 bg-gray-800 p-2 text-white"
                                />
                                {errors.address_line_two && <p className="text-sm text-red-500">{errors.address_line_two}</p>}
                            </div>
                            <AddressSelect data={data} setData={setData} errors={errors} />

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </AdminLayout>
    );
};

export default CreateCustomer;
