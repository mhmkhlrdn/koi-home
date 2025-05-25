import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

// Export to Excel
// Example implementation of exportToExcel
export const exportToExcel = (sheets, fileName) => {
    try {
        const XLSX = require('xlsx');
        const wb = XLSX.utils.book_new();

        sheets.forEach(({ name, data }) => {
            const ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, name);
        });

        XLSX.writeFile(wb, `${fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        alert('Error exporting to Excel. Please try again.');
    }
};

// Example implementation of exportToPDF
export const exportToPDF = (title, data, columns, fileName) => {
    try {
        const { jsPDF } = require('jspdf');
        const autoTable = require('jspdf-autotable');

        const doc = new jsPDF();
        doc.text(title, 14, 16);

        const tableData = data.map((row) => columns.map((col) => row[col.key] || ''));

        autoTable(doc, {
            head: [columns.map((col) => col.label)],
            body: tableData,
            startY: 20,
            styles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 'auto' },
            },
        });

        doc.save(`${fileName}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
        console.error('Error exporting to PDF:', error);
        alert('Error exporting to PDF. Please try again.');
    }
};

// Export charts as images to PDF
export const exportChartsToPDF = async (chartIds, fileName) => {
    try {
        const { jsPDF } = require('jspdf');
        const doc = new jsPDF();

        for (let i = 0; i < chartIds.length; i++) {
            const chartId = chartIds[i];
            const chartElement = document.getElementById(chartId);

            if (chartElement) {
                const canvas = await html2canvas(chartElement);
                const imgData = canvas.toDataURL('image/png');

                if (i > 0) doc.addPage();
                doc.addImage(imgData, 'PNG', 10, 10, 180, 100);
            }
        }

        doc.save(`${fileName}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
        console.error('Error exporting charts:', error);
        alert('Error exporting charts. Please try again.');
    }
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
