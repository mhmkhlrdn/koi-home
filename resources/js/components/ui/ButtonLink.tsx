import { Link, usePage } from "@inertiajs/react";
import React from "react";

interface ButtonProps {
    label: string;
    classNames?: string;
    href: string;
    activeStyle?: string;
    variant?: 'primary' | 'transparent' | 'danger';
}

const ButtonLink = ({ label, variant = 'primary', classNames, href, activeStyle }: ButtonProps) => {
    const url = usePage().url;
    const isActive = url.includes(`${href}`) ? `${activeStyle}` : "";
    const baseStyle = 'block p-2 px-4 text-center cursor-pointer transition duration-200'
    const variantStyle = {
        primary: "bg-blue-500 hover:bg-blue-600 rounded-lg",
        transparent: "bg-transparent hover:border-b-1 border-white",
        danger: "bg-red-500 hover:bg-red-600 rounded-lg",
    };
    return (
        <Link href={href} className={`${baseStyle} ${variantStyle[variant]} ${classNames} ${activeStyle}`}>
            <span >{label}</span>
        </Link>
    );
};

export default ButtonLink;
