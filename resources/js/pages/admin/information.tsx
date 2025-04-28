import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const Information = () => {
    const { information } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [countryCities, setCountryCities] = useState([]);
    const [countryStates, setCountryStates] = useState([]);

    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries')
            .then((response) => response.json())
            .then((result) => {
                setCountryCities(result.data || []);
            })
            .catch((error) => console.error('error', error));

        fetch('https://countriesnow.space/api/v0.1/countries/states').then((response) =>
            response
                .json()
                .then((result) => {
                    setCountryStates(result.data || []);
                })
                .catch((error) => console.error('error', error)),
        );
    }, []);

    return (
        <AdminLayout>
            <div className="mainWrapper">
                <MainHeader title="Company Information" />
                <div className="space-y-6">
                    {information.map((item) => (
                        <div key={item.id} className="rounded-lg bg-gray-600 p-6 shadow">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                                <img src={item.logo_url} alt={`${item.name} logo`} className="h-24 w-24 rounded border object-contain" />
                                <table className="mt-4 w-full max-w-xl text-sm text-white sm:mt-0">
                                    <tbody>
                                        <tr>
                                            <th className="w-1/3 bg-gray-700 px-4 py-2 text-left font-semibold">Company Name:</th>
                                            <td className="px-4 py-2">{item.name}</td>
                                        </tr>
                                        <tr>
                                            <th className="bg-gray-700 px-4 py-2 text-left font-semibold">Address Line One:</th>
                                            <td className="px-4 py-2">{item.addressLineOne}</td>
                                        </tr>
                                        <tr>
                                            <th className="bg-gray-700 px-4 py-2 text-left font-semibold">Address Line Two:</th>
                                            <td className="px-4 py-2">{item.addressLineTwo}</td>
                                        </tr>
                                        <tr>
                                            <th className="bg-gray-700 px-4 py-2 text-left font-semibold">City:</th>
                                            <td className="px-4 py-2">{item.city}</td>
                                        </tr>
                                        <tr>
                                            <th className="bg-gray-700 px-4 py-2 text-left font-semibold">Province:</th>
                                            <td className="px-4 py-2">{item.province}</td>
                                        </tr>
                                        <tr>
                                            <th className="bg-gray-700 px-4 py-2 text-left font-semibold">Postal Code:</th>
                                            <td className="px-4 py-2">{item.postalCode}</td>
                                        </tr>
                                        <tr>
                                            <th className="bg-gray-700 px-4 py-2 text-left font-semibold">Country:</th>
                                            <td className="px-4 py-2">{item.country}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="mt-4 sm:mt-0">
                                    <button onClick={() => setEditing(item)} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {editing && <EditModal item={editing} countryCities={countryCities} countryStates={countryStates} onClose={() => setEditing(null)} />}
            </div>
        </AdminLayout>
    );
};

export default Information;

const EditModal = ({ item, countryCities, countryStates, onClose }) => {
    const { data, setData, patch, processing, errors } = useForm({
        name: item.name,
        addressLineOne: item.addressLineOne,
        addressLineTwo: item.addressLineTwo,
        city: item.city,
        province: item.province,
        postalCode: item.postalCode,
        country: item.country,
        logo_url: item.logo_url,
    });

    // Find the cities of the selected country
    const selectedCountry = countryCities.find((c) => c.country === data.country);
    const cities = selectedCountry ? selectedCountry.cities : [];
    const selectedCountryStates = countryStates.find((c) => c.name === data.country);
    const states = selectedCountryStates ? selectedCountryStates.states : [];

    console.log('states', states);
    console.log('selectedCountryStates', selectedCountryStates);
    console.log('selectedCountry', selectedCountry);
    console.log('cities', cities);

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('info.update'));
    };

    return (
        <div className="fixed inset-0 z-50 mx-auto flex w-full items-center justify-center bg-black/50">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded bg-gray-700 p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">Edit Company Information</h2>

                <div className="space-y-4">
                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium">Company Name</label>
                        <input
                            type="text"
                            className="mt-1 w-full rounded border bg-gray-800 p-2"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    {/* Address Line One */}
                    <div>
                        <label className="block text-sm font-medium">Address Line One</label>
                        <input
                            type="text"
                            className="mt-1 w-full rounded border bg-gray-800 p-2"
                            value={data.addressLineOne}
                            onChange={(e) => setData('addressLineOne', e.target.value)}
                        />
                        {errors.addressLineOne && <p className="text-sm text-red-500">{errors.addressLineOne}</p>}
                    </div>

                    {/* Address Line Two */}
                    <div>
                        <label className="block text-sm font-medium">Address Line Two</label>
                        <input
                            type="text"
                            className="mt-1 w-full rounded border bg-gray-800 p-2"
                            value={data.addressLineTwo}
                            onChange={(e) => setData('addressLineTwo', e.target.value)}
                        />
                        {errors.addressLineTwo && <p className="text-sm text-red-500">{errors.addressLineTwo}</p>}
                    </div>

                    {/* Country Select */}
                    <div>
                        <label className="block text-sm font-medium">Country</label>
                        <select
                            className="mt-1 w-full rounded border bg-gray-800 p-2"
                            value={data.country}
                            onChange={(e) => {
                                setData('country', e.target.value);
                                setData('city', ''); // Reset city when country changes
                            }}
                        >
                            <option value="">Select a country</option>
                            {countryCities.map((country) => (
                                <option key={country.country} value={country.country}>
                                    {country.country}
                                </option>
                            ))}
                        </select>
                        {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                    </div>

                    {/* City Select */}
                    <div>
                        <label className="block text-sm font-medium">City</label>
                        <select
                            className="mt-1 w-full rounded border bg-gray-800 p-2"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            disabled={!cities.length}
                        >
                            <option value="">Select a city</option>
                            {cities.map((cityName) => (
                                <option key={cityName} value={cityName}>
                                    {cityName}
                                </option>
                            ))}
                        </select>
                        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                    </div>

                    {/* Province */}
                    <div>
                        <label className="block text-sm font-medium">Province</label>
                        <select
                            className="mt-1 w-full rounded border bg-gray-800 p-2"
                            value={data.province}
                            onChange={(e) => setData('province', e.target.value)}
                            disabled={!states.length}
                        >
                            <option value="">Select a province/state</option>
                            {states.map((state) => (
                                <option key={state.name} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                        {/* <input
                            type="text"
                            className="mt-1 w-full rounded border bg-gray-800 p-2"
                            value={data.province}
                            onChange={(e) => setData('province', e.target.value)}
                        /> */}
                        {errors.province && <p className="text-sm text-red-500">{errors.province}</p>}
                    </div>

                    {/* Postal Code */}
                    <div>
                        <label className="block text-sm font-medium">Postal Code</label>
                        <input
                            type="text"
                            className="mt-1 w-full rounded border bg-gray-800 p-2"
                            value={data.postalCode}
                            onChange={(e) => setData('postalCode', e.target.value)}
                        />
                        {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
                    </div>

                    {/* Logo URL */}
                    <div>
                        <label className="block text-sm font-medium">Logo URL</label>
                        <input
                            type="text"
                            className="mt-1 w-full rounded border bg-gray-800 p-2"
                            value={data.logo_url}
                            onChange={(e) => setData('logo_url', e.target.value)}
                        />
                        {errors.logo_url && <p className="text-sm text-red-500">{errors.logo_url}</p>}
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                        Cancel
                    </button>
                    <button type="submit" disabled={processing} className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};
