import ButtonLink from '@/components/ui/ButtonLink';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Information {
    logo_url: string;
    name: string;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
}

const HomeHeader = () => {
    const { info } = usePage().props as { info?: Information | null };
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false); // Hide on scroll down
            } else {
                setIsVisible(true); // Show on scroll up
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div className={`fixed top-0 z-50 w-full transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <nav className="top-0 flex h-24 w-screen items-center justify-between rounded-b-2xl bg-[#0f4fffa1] p-4">
                <div className="mr-2 flex items-center gap-4">
                    <img src={info?.logo_url} alt="Company Logo" className="h-12 w-12 rounded-full" />
                    <span>{info?.name}</span>
                    <div className="flex items-center gap-x-2">
                        <ButtonLink href="" label="Home" variant="transparent" />
                        <ButtonLink href="" label="Fishes" variant="transparent" />
                        <ButtonLink href="" label="About" variant="transparent" />
                        <ButtonLink href="" label="Guidelines" variant="transparent" />
                    </div>
                </div>

                <div>
                    <div className="flex space-x-4">
                        <ButtonLink href="/login" label="Login" />
                        <ButtonLink href="/register" label="Register" />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HomeHeader;
