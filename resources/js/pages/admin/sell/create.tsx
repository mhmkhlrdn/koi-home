import SecondaryHeader from '@/components/SecondaryHeader';
import { Link, router, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import AdminLayout from './../../../layouts/AdminLayout';

const SellCreate = ({ selectedFishes, allFishes, customers }) => {
    const [showFishSelector, setShowFishSelector] = useState(false);
    const { fish_code: fishCodeFromURL } = usePage().props;
    const [fishPrices, setFishPrices] = useState(() => Object.fromEntries(selectedFishes.map((fish) => [fish.id, 0])));
    const [additionalFee, setAdditionalFee] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [customerAddress, setCustomerAddress] = useState({
        city: '',
        postal_code: '',
        address_line_one: '',
        address_line_two: '',
        phone: '',
        email: '',
    });
    console.log(customers);
    // const { data, setData, processing, errors, post } = useForm({
    //     fish_id: fish?.id || '',
    //     price: 0,
    //     customer_id: 0,
    //     payment_status: '',
    // });
    const selectedIds = selectedFishes.map((f) => f.id);
    const handleAddFish = (fishId) => {
        const newIds = [...selectedIds, fishId];

        // Remove duplicates
        const uniqueIds = [...new Set(newIds)];

        router.visit(route('fishes.sell', { fish_id: uniqueIds }), {
            preserveScroll: true,
        });
        console.log(uniqueIds);
    };
    const handlePriceChange = (fishId, newPrice) => {
        setFishPrices((prev) => ({ ...prev, [fishId]: parseInt(newPrice) || 0 }));
    };

    const handleFeeChange = (value) => {
        setAdditionalFee(parseInt(value) || 0);
    };
    const totalPrice = Object.values(fishPrices).reduce((sum, price) => sum + price, 0) + additionalFee;

    useEffect(() => {
        const filteredCustomer = customers.filter((obj) => obj.id == selectedCustomer);
        console.log(filteredCustomer);
        if (selectedCustomer) {
            setCustomerAddress({
                city: filteredCustomer[0].address.city,
                postal_code: filteredCustomer[0].address.postal_code,
                address_line_one: filteredCustomer[0].address.address_line_one,
                address_line_two: filteredCustomer[0].address.address_line_two,
                phone: filteredCustomer[0].phone,
                email: filteredCustomer[0].email,
            });
        } else {
            setCustomerAddress({
                city: '',
                postal_code: '',
                address_line_one: '',
                address_line_two: '',
                phone: '',
                email: '',
            });
        }
    }, [selectedCustomer]);

    return (
        <AdminLayout>
            <div className="container mx-auto">
                <div className="rounded-lg border-b-6 border-gray-900 bg-gray-700 p-6 shadow">
                    {selectedFishes.map((fish) => (
                        <>
                            <SecondaryHeader title={`Selling ${fish.code}`} />
                            <div className="my-4 flex gap-x-4">
                                <div className="flex-2/9 rounded-md bg-gray-800 p-4">
                                    <img className="w-full rounded-lg" src={`/${fish.latest_size.photoUrl}`} alt="" />
                                </div>
                                <div className="flex flex-3/7 flex-col gap-y-1 rounded-md bg-gray-800 p-4">
                                    <SecondaryHeader title={'Fish Details'} />
                                    <span>
                                        Variety: <b>{fish.variety.name}</b>
                                    </span>
                                    <span>
                                        Bloodline: <b>{fish.bloodline.name}</b>
                                    </span>
                                    <span>
                                        Date of Birth: <b>{fish.birthDate}</b>
                                    </span>
                                    <span>
                                        Latest Recorded Size: <b>{fish.latest_size.recorded_at}</b>
                                    </span>
                                    <span>
                                        Weight: <b>{fish.latest_size.weight}g</b>
                                    </span>
                                    <span>
                                        Length: <b>{fish.latest_size.length}cm</b>
                                    </span>
                                </div>
                                <div className="flex w-full flex-3/7">
                                    <div className="grid w-full grid-rows-3 gap-y-1">
                                        <div className="row-span-3 rounded-md bg-gray-800 p-4">
                                            <SecondaryHeader title={'Certificate'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowFishSelector(true)}
                            className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
                            type="button"
                        >
                            Add Another Fish
                        </button>
                    </div>
                </div>
                <div className="mt-4 rounded-lg border-b-6 border-gray-900 bg-gray-700 p-6 shadow">
                    <SecondaryHeader title={`Transaction Details`} />
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-white">Fishes Being Sold</h3>
                            <table className="w-full text-left text-white">
                                <thead>
                                    <tr className="bg-gray-600">
                                        <th className="p-2">Code</th>
                                        <th className="p-2">View</th>
                                        <th className="p-2">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedFishes.map((fish) => (
                                        <tr key={fish.id} className="border-t border-gray-500">
                                            <td className="p-2">{fish.code}</td>
                                            <td className="justify-center">
                                                <a className="text-center" target="_blank" href={`/kh-admin/fish/${fish.id}`}>
                                                    <Eye className="size-4 justify-center rounded-sm bg-green-400" />
                                                </a>
                                            </td>
                                            <td className="p-2">
                                                <input
                                                    type="number"
                                                    value={fishPrices[fish.id] || ''}
                                                    onChange={(e) => handlePriceChange(fish.id, e.target.value)}
                                                    className="w-full rounded bg-gray-600 p-2 text-white"
                                                    placeholder="Enter price"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="additional_fee" className="font-semibold text-white">
                                Additional Fee
                            </label>
                            <input
                                type="number"
                                id="additional_fee"
                                value={additionalFee}
                                onChange={(e) => handleFeeChange(e.target.value)}
                                className="w-full rounded bg-gray-600 p-2 text-white"
                                placeholder="e.g., Delivery or Packing Fee"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <label htmlFor="customer_select" className="self-center font-semibold text-white">
                                    Customer
                                </label>
                                <select
                                    id="customer_select"
                                    value={selectedCustomer}
                                    onChange={(e) => setSelectedCustomer(e.target.value)}
                                    className="w-full rounded bg-gray-600 p-2 text-white"
                                >
                                    <option value="">-- Select Customer --</option>
                                    {customers.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.first_name} {c.last_name}
                                        </option>
                                    ))}
                                </select>
                                <Link className="self-center rounded-md bg-blue-500 px-4 py-2 font-semibold text-white" href={'/'}>
                                    New
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="mb-1 block font-semibold text-white">Phone Number</label>
                                        <input
                                            disabled
                                            type="text"
                                            value={customerAddress.phone || ''}
                                            className="w-full rounded bg-gray-600 p-2 text-white"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block font-semibold text-white">Email Address</label>
                                        <input
                                            disabled
                                            type="text"
                                            value={customerAddress.email || ''}
                                            className="w-full rounded bg-gray-600 p-2 text-white"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block font-semibold text-white">City</label>
                                        <input
                                            disabled
                                            type="text"
                                            value={customerAddress.city || ''}
                                            className="w-full rounded bg-gray-600 p-2 text-white"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="mb-1 block font-semibold text-white">Postal Code</label>
                                        <input
                                            disabled
                                            type="text"
                                            value={customerAddress.postal_code || ''}
                                            className="w-full rounded bg-gray-600 p-2 text-white"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block font-semibold text-white">Address Line One</label>
                                        <input
                                            disabled
                                            type="text"
                                            value={customerAddress.address_line_one || ''}
                                            className="w-full rounded bg-gray-600 p-2 text-white"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block font-semibold text-white">Address Line Two</label>
                                        <input
                                            disabled
                                            type="text"
                                            value={customerAddress.address_line_two || ''}
                                            className="w-full rounded bg-gray-600 p-2 text-white"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-right text-lg font-bold text-white">Total Price: Rp {totalPrice.toLocaleString()}</div>
                    </div>
                </div>
            </div>
            {showFishSelector && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded bg-gray-600 p-6 text-white shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold">Select a Fish to Sell</h2>
                            <button className="font-semibold text-red-600" onClick={() => setShowFishSelector(false)}>
                                ✕ Close
                            </button>
                        </div>
                        <table className="w-full border border-gray-700 text-left">
                            <thead>
                                <tr className="bg-gray-500">
                                    <th className="p-2">Code</th>
                                    <th className="p-2">Variety</th>
                                    <th className="p-2">Bloodline</th>
                                    <th className="p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFishes.map((f) => (
                                    <tr key={f.id} className="border-t">
                                        <td className="p-2">{f.code}</td>
                                        <td className="p-2">{f.variety.name}</td>
                                        <td className="p-2">{f.bloodline.name}</td>
                                        <td className="p-2">
                                            <button
                                                className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-500"
                                                onClick={() => handleAddFish(f.id)}
                                            >
                                                Sell
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default SellCreate;
