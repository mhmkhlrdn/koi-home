import React from 'react';

interface Column {
    key: string;
    label: string;
    render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    actions?: (item: any) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, actions }) => {
    return (
        <div className="overflow-x-auto rounded-lg bg-[#485367] shadow-md">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-900 text-white">
                        {columns.map((col) => (
                            <th key={col.key} className="border p-3">
                                {col.label}
                            </th>
                        ))}
                        {actions && <th className="border p-3">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
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
