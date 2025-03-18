import Sidebar from '@/components/sidebar';

export default function AdminLayout({ children }) {
    return (
        <main className="flex h-screen">
            <Sidebar />
            <section className="flex-1 overflow-y-auto bg-[#1B2435] p-4">{children}</section>
        </main>
    );
}
