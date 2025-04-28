import MainHeader from '@/components/MainHeader';
import AdminLayout from '@/layouts/AdminLayout';
import { useEffect, useState } from 'react';

type Country = {
    name: {
        common: string;
        official: string;
    };
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
};

const CountryPage = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,flags')
            .then((res) => res.json())
            .then((data) => {
                const sorted = data.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
                setCountries(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <AdminLayout>
            <main className="mainWrapper space-y-6">
                <MainHeader title="Country Informations" />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <p className="text-md inline-block rounded bg-gray-600 px-4 py-2 font-bold text-white shadow-md">
                            Total Countries: {countries.length}
                        </p>

                        <div className="overflow-x-auto rounded shadow">
                            <table className="min-w-full rounded-lg bg-gray-700">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="p-3 text-left font-semibold">Flag</th>
                                        <th className="p-3 text-left font-semibold">Common Name</th>
                                        <th className="p-3 text-left font-semibold">Official Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {countries.map((country, index) => (
                                        <tr key={index} className="border-t border-gray-600 text-white">
                                            <td className="p-3">
                                                <img
                                                    src={country.flags.png}
                                                    alt={country.flags.alt || `Flag of ${country.name.common}`}
                                                    className="h-auto w-12 rounded shadow"
                                                />
                                            </td>
                                            <td className="p-3">{country.name.common}</td>
                                            <td className="p-3">{country.name.official}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </main>
        </AdminLayout>
    );
};

export default CountryPage;
