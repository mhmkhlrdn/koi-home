import { useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login'); // Sends request to Laravel login route
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-900">
            <form onSubmit={handleSubmit} className="rounded bg-gray-700 p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">Login</h2>
                <div>
                    <label className="block">Email:</label>
                    <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full rounded border p-2" />

                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div className="mt-4">
                    <label className="block">Password:</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full rounded border p-2"
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white" disabled={processing}>
                    {processing ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}
