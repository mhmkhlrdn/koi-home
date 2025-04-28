import { Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-2xl">
                <h2 className="mb-6 text-center text-3xl font-bold text-white">Create Account</h2>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-semibold text-gray-300">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded-lg border-none bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-semibold text-gray-300">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-lg border-none bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-semibold text-gray-300">Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full rounded-lg border-none bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-semibold text-gray-300">Confirm Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full rounded-lg border-none bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                    disabled={processing}
                >
                    {processing ? 'Registering...' : 'Register'}
                </button>

                <div className="mt-6 flex justify-between text-sm text-gray-400">
                    <Link href="/" className="underline hover:text-white">
                        ← Back to Home
                    </Link>
                    <Link href="/login" className="underline hover:text-white">
                        Already have an account?
                    </Link>
                </div>
            </form>
        </div>
    );
}
