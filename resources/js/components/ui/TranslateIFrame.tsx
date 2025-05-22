// components/TranslateIframe.tsx
import { useState } from 'react';

export default function TranslateIframe() {
    const [showIframe, setShowIframe] = useState(false);
    const [language, setLanguage] = useState('en');

    const toggleLanguage = (lang: string) => {
        setLanguage(lang);
        setShowIframe(true);
        setTimeout(() => setShowIframe(false), 1000);
    };

    return (
        <div className="relative">
            <div className="flex gap-2">
                <button
                    onClick={() => toggleLanguage('en')}
                    className="px-2 py-1 text-sm rounded hover:bg-gray-700"
                >
                    English
                </button>
                <button
                    onClick={() => toggleLanguage('id')}
                    className="px-2 py-1 text-sm rounded hover:bg-gray-700"
                >
                    Bahasa
                </button>
            </div>

            {showIframe && (
                <iframe
                    src={`https://translate.google.com/translate?hl=${language}&sl=auto&tl=${language}&u=${encodeURIComponent(window.location.href)}`}
                    style={{ width: 0, height: 0, border: 0 }}
                    sandbox="allow-scripts allow-same-origin"
                    title="Google Translate"
                />
            )}
        </div>
    );
}
