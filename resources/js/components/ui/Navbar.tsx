import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface NavLink {
    label: string;
    route: string;
}

interface NavbarProps {
    links: NavLink[];
}

const Navbar = ({ links }: NavbarProps) => {

  return (
    <div className=" flex gap-x-4 text-lg font-bold">
      {links.map((l, index) => {
        const isActive = usePage().url.includes(`${l.route}`);
        return (
          <Link
            key={index}
            href={l.route}
            className={`px-4 py-2 rounded-md hover:bg-gray-600 `}
          >
            <p className={` ${
              isActive ? "border-b-3 pb-1 border-white" : ""
            }`}>{l.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
