import React, { useMemo, useState } from 'react';

interface Column {
    key: string;
    label: string;
    render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
    classStyles?: string;
    columns: Column[];
    data: any[];
    actions?: (item: any) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ classStyles, columns, data, actions }) => {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (key: string) => {
        if (sortKey === key) {
            // Toggle order
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            // New sort key
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const sortedData = useMemo(() => {
        if (!sortKey) return data;
        return [...data].sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];

            if (aValue == null) return 1;
            if (bValue == null) return -1;

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }

            return sortOrder === 'asc' ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
        });
    }, [data, sortKey, sortOrder]);

    return (
        <div className={`overflow-x-auto rounded-lg bg-[#485367] shadow-md ${classStyles}`}>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-900 text-white">
                        {columns.map((col) => (
                            <th key={col.key} className="cursor-pointer border p-3 select-none" onClick={() => handleSort(col.key)}>
                                {col.label}
                                {sortKey === col.key && <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                            </th>
                        ))}
                        {actions && <th className="border p-3">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item.id} className="mx-auto border-t text-center">
                            {columns.map((col) => (
                                <td key={col.key} className="border p-3">
                                    {col.render ? col.render(item) : item[col.key]}
                                </td>
                            ))}
                            {actions && (
                                <td className="border p-3">
                                    <div className="flex justify-center gap-2">{actions(item)}</div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
