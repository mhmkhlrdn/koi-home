import { useState } from 'react';
import * as icons from 'lucide-react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function TopBar() {
    const { url } = usePage();
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'id', name: 'Bahasa Indonesia' },
    ];

    return (
        <header className="sticky top-0 z-10 flex h-24 items-center justify-between bg-gray-900 px-6 text-white shadow-md">
            {/* Dashboard Link */}
            <Link
                href="/kh-admin/dashboard"
                className={`flex items-center gap-2 rounded-lg px-4 py-5 transition-colors ${url.startsWith('/kh-admin/dashboard') ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
            >
                <icons.LayoutDashboard className="h-5 w-5" />
                <span className="text-sm font-medium">Dashboard</span>
            </Link>

            <div className="flex items-center gap-4">
                {/* Theme Switcher */}
                <button
                    onClick={toggleDarkMode}
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-800"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? (
                        <icons.Sun className="h-5 w-5" />
                    ) : (
                        <icons.Moon className="h-5 w-5" />
                    )}
                </button>

                {/* Language Switcher */}
                <div className="relative">
                    <button
                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-800"
                        aria-label="Change language"
                    >
                        <icons.Languages className="h-5 w-5" />
                    </button>

                    {showLanguageDropdown && (
                        <div className="absolute right-0 mt-2 w-40 rounded-md bg-gray-800 shadow-lg">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setShowLanguageDropdown(false);
                                    }}
                                    className={`block w-full px-4 py-2 text-left text-sm ${language === lang.code ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}
