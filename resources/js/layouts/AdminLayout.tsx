import Sidebar from '@/components/sidebar';
import TopBar from '@/components/ui/Topbar';

export default function AdminLayout({ children }) {
    return (
        <main className="flex h-screen">
            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">
                <TopBar />
                <section className="flex-1 overflow-y-auto bg-[#1B2435] p-4">{children}</section>
            </div>
        </main>
    );
}
