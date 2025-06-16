import DataTable from '@/components/DataTable';
import MainHeader from '@/components/MainHeader';
import Modal from '@/components/Modal';
import PaginationNav from '@/components/PaginationNav';
import AddressSelect from '@/components/ui/AddressSelect';
import AdminLayout from '@/layouts/AdminLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

const customer = () => {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        pagination_limit: '10',
    });
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, put, processing, reset, errors } = useForm({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address_line_one: '',
        address_line_two: '',
        province: '',
        country: '',
        postal_code: '',
        city: '',
    });
    const { customers } = usePage().props;
    console.log(customers);
    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'email', label: 'Email' },
        { key: 'address_country', label: 'Country' },
    ];

    const extraInfo = [
        {
            key: 'address_city',
            label: 'City',
            render: (item) => (item.address_city ? <h1>{item.address_city}</h1> : <span className="text-gray-400 italic">No data</span>),
        },

        {
            key: 'address_one',
            label: 'Address Line One',
            render: (item) => (item.address_one ? <h1>{item.address_one}</h1> : <span className="text-gray-400 italic">No data</span>),
        },
        {
            key: 'address_two',
            label: 'Address Line Two',
            render: (item) => (item.address_two ? <h1>{item.address_two}</h1> : <span className="text-gray-400 italic">No data</span>),
        },
        {
            key: 'address_postal',
            label: 'Postal Code',
            render: (item) => (item.address_postal ? <h1>{item.address_postal}</h1> : <span className="text-gray-400 italic">No data</span>),
        },
        {
            key: 'address_province',
            label: 'Province',
            render: (item) => (item.address_province ? <h1>{item.address_province}</h1> : <span className="text-gray-400 italic">No data</span>),
        },
    ];
    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };
    const manageFilterModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
        reset();
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.id) {
            console.error('Error: Customer ID is missing!');
            return;
        }

        put(route('customers.update', data.id), {
            preserveScroll: true,
            data: {
                ...data,
                country_id: data.country_id ? parseInt(data.country_id, 10) : null,
            },
            onSuccess: () => closeModal(),
        });
    };
    const openModal = (customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
        setData({
            id: customer.id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            phone: customer.phone,
            address_line_one: customer.address_one,
            address_line_two: customer.address_two,
            province: customer.address_province,
            country_id: customer.address_country_id,
            postal_code: customer.address_postal,
            city: customer.address_city,
        });
    };
    const renderActions = (customer) => (
        <>
            <button onClick={() => openModal(customer)} className="rounded bg-yellow-500 p-2 text-white hover:bg-yellow-600">
                <Pencil className="h-4 w-4" />
            </button>
            <button className="rounded bg-red-500 p-2 text-white hover:bg-red-600">
                <Trash className="h-4 w-4" />
            </button>
            <Link href={`/kh-admin/customer/${customer.id}`} className="rounded bg-green-500 p-2 text-white hover:bg-green-600">
                <Eye className="h-4 w-4" />
            </Link>
        </>
    );
    return (
        <AdminLayout>
            <main className="grid grid-cols-4 gap-4">
                <div className="col-span-4 rounded-2xl border-b-6 border-gray-900 bg-gray-700 px-6 py-4">
                    <MainHeader
                        createHref={route('customer.create')}
                        variant="primary"
                        onClickFilter={manageFilterModal}
                        title="Customer Management"
                    />
                    <DataTable extraInfo={extraInfo} columns={columns} data={customers.data} actions={renderActions} />
                    <PaginationNav links={customers.links} />
                </div>
            </main>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit Customer">
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        placeholder="First Name"
                        className="modalInput"
                        required
                    />
                    <input
                        type="text"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        placeholder="Last Name"
                        className="modalInput"
                        required
                    />
                    <input
                        type="text"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Email"
                        className="modalInput"
                        required
                    />
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="Phone"
                        className="modalInput"
                        required
                    />
                    <input
                        type="text"
                        value={data.address_line_one}
                        onChange={(e) => setData('address_line_one', e.target.value)}
                        placeholder="Address Line One"
                        className="modalInput"
                        required
                    />
                    <input
                        type="text"
                        value={data.address_line_two}
                        onChange={(e) => setData('address_line_two', e.target.value)}
                        placeholder="Address Line Two"
                        className="modalInput"
                        required
                    />
                    <input
                        type="text"
                        value={data.postal_code}
                        onChange={(e) => setData('postal_code', e.target.value)}
                        placeholder="Postal Code"
                        className="modalInput"
                        required
                    />
                    <AddressSelect data={data} setData={setData} errors={errors} />
                </form>
            </Modal>
        </AdminLayout>
    );
};

export default customer;
