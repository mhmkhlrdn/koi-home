import Sidebar from '@/components/sidebar';
import TopBar from '@/components/ui/Topbar';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Check for flash messages in URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const successMessage = urlParams.get('success');
        const errorMessage = urlParams.get('error');
        const infoMessage = urlParams.get('info');
        const warningMessage = urlParams.get('warning');

        const newMessages = [];

        if (successMessage) newMessages.push({ type: 'success', content: successMessage });
        if (errorMessage) newMessages.push({ type: 'error', content: errorMessage });
        if (infoMessage) newMessages.push({ type: 'info', content: infoMessage });
        if (warningMessage) newMessages.push({ type: 'warning', content: warningMessage });

        if (newMessages.length > 0) {
            setMessages(newMessages);

            // Clean up the URL after reading the messages
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }

        // Alternatively, if you're using session storage:
        // const sessionMessages = JSON.parse(sessionStorage.getItem('flash_messages') || [];
        // if (sessionMessages.length > 0) {
        //     setMessages(sessionMessages);
        //     sessionStorage.removeItem('flash_messages');
        // }
    }, []);

    const removeMessage = (index) => {
        setMessages((prev) => prev.filter((_, i) => i !== index));
    };

    const getMessageClass = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-100 border-green-400 text-green-700';
            case 'error':
                return 'bg-red-100 border-red-400 text-red-700';
            case 'warning':
                return 'bg-yellow-100 border-yellow-400 text-yellow-700';
            case 'info':
                return 'bg-blue-100 border-blue-400 text-blue-700';
            default:
                return 'bg-gray-100 border-gray-400 text-gray-700';
        }
    };

    return (
        <main className="flex h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <TopBar />
                <section className="flex-1 overflow-y-auto bg-[#1B2435] p-4">
                    {/* Flash messages container */}
                    <div className="fixed top-20 right-4 z-50 space-y-2">
                        {messages.map((message, index) => (
                            <div key={index} className={`${getMessageClass(message.type)} relative rounded border px-4 py-3`} role="alert">
                                <span className="block sm:inline">{message.content}</span>
                                <span className="absolute top-0 right-0 bottom-0 px-4 py-3">
                                    <svg
                                        className={`h-6 w-6 fill-current ${message.type === 'success' ? 'text-green-500' : message.type === 'error' ? 'text-red-500' : message.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`}
                                        role="button"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        onClick={() => removeMessage(index)}
                                    >
                                        <title>Close</title>
                                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </div>
                    {children}
                </section>
            </div>
        </main>
    );
}
