import React, { useMemo, useState } from 'react';

interface Column {
    key: string;
    label: string;
    render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
    classStyles?: string;
    columns: Column[];
    extraInfo?: Column[];
    data: any[];
    actions?: (item: any) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ classStyles, columns, data, actions, extraInfo }) => {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const toggleRow = (id: number) => {
        setExpandedRows((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

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
                        <React.Fragment key={item.id}>
                            <tr
                                className={`mx-auto border-t text-center hover:bg-gray-700 ${extraInfo ? 'cursor-pointer' : ''}`}
                                onClick={() => toggleRow(item.id)}
                            >
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

                            {extraInfo && expandedRows.has(item.id) && (
                                <tr>
                                    <td colSpan={actions ? columns.length + 1 : columns.length} className="border bg-gray-800 px-4 py-0 text-white">
                                        <div className={`flex justify-between overflow-hidden`}>
                                            {extraInfo.map((info) => (
                                                <div className="py-3 text-white" key={info.key}>
                                                    <h1>{info.label}:</h1>
                                                    <p>{info.render ? info.render(item) : item[info.key]}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
