import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: {
        first?: string;
        last?: string;
        prev?: string | null;
        next?: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Disease {
    id: number;
    name: string;
    description: string;
    [key: string]: unknown;
}

export interface Medicine {
    id: number;
    name: string;
    amount: number;
    measurement_id: number;
    measurement?: Measurement;
    instruction: string;
    packaging: number;
    image_url: string;
    [key: string]: unknown;
}

export interface Measurement {
    id: number;
    name: string;
    [key: string]: unknown;
}

export interface Treatment {
    id: number;
    name: string;
    disease_id: number;
    disease?: Disease;
    medicine_id: number;
    medicine?: Medicine;
    description: string;
    [key: string]: unknown;
}
