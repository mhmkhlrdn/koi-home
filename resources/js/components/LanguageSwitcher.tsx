// components/LanguageSwitcher.tsx
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
    const [loaded, setLoaded] = useState(false);

    const changeLanguage = (langCode: string) => {
        if (loaded && (window as any).google?.translate?.TranslateElement) {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                (select as HTMLSelectElement).value = langCode;
                select.dispatchEvent(new Event('change'));
            }
        }
    };

    useEffect(() => {
        if (!loaded) {
            const script = document.createElement('script');
            script.src = '/kh-admin/translate-proxy/element.js?cb=googleTranslateElementInit';
            script.async = true;
            script.onload = () => setLoaded(true);
            document.body.appendChild(script);

            (window as any).googleTranslateElementInit = function () {
                new (window as any).google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'en,id',
                        layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                        // Use proxy for API calls
                        gaTrack: false,
                        gaId: null,
                        // Override default API path
                        apiPath: '/kh-admin/translate-proxy',
                    },
                    'google_translate_element',
                );
            };
        }
    }, [loaded]);

    return (
        <div className="flex items-center gap-2">
            <button onClick={() => changeLanguage('en')} className="rounded px-2 py-1 text-sm hover:bg-gray-700">
                English
            </button>
            <button onClick={() => changeLanguage('id')} className="rounded px-2 py-1 text-sm hover:bg-gray-700">
                Bahasa
            </button>
            <div id="google_translate_element" className="hidden"></div>
        </div>
    );
}
