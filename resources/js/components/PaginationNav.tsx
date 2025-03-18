import { Link } from '@inertiajs/react';

interface PaginationProps {
    links: { url: string | null; label: string; active: boolean }[];
}

const PaginationNav = ({ links }: PaginationProps) => {
    if (links.length <= 3) return null; // Hide pagination if there's no need

    const maxVisible = 12; // Total max numbers before truncation
    const numBefore = 5; // Numbers before "..."
    const numAfter = 6; // Numbers after "..."

    // Extract numeric pages
    const numericPages = links.filter((link) => !isNaN(Number(link.label))).map((link) => Number(link.label));

    if (numericPages.length <= maxVisible) {
        return (
            <div className="flex items-center justify-center gap-2 py-4">
                {links.map((link, index) => (
                    <PaginationLink key={index} link={link} />
                ))}
            </div>
        );
    }

    // First and last page numbers
    const firstPage = numericPages[0];
    const lastPage = numericPages[numericPages.length - 1];

    let displayedLinks = links.filter((link) => {
        const pageNum = Number(link.label);
        return (
            isNaN(pageNum) || // Keep "Previous" and "Next"
            pageNum <= firstPage + numBefore || // First few pages
            pageNum >= lastPage - numAfter // Last few pages
        );
    });

    // Ensure "..." is added in the correct spot
    const beforeEllipsisIndex = displayedLinks.findIndex((link) => Number(link.label) === firstPage + numBefore);
    const afterEllipsisIndex = displayedLinks.findIndex((link) => Number(link.label) === lastPage - numAfter);

    if (beforeEllipsisIndex > 0) {
        displayedLinks.splice(beforeEllipsisIndex + 1, 0, { url: null, label: '...', active: false });
    }

    if (afterEllipsisIndex > 0) {
        displayedLinks.splice(afterEllipsisIndex, 0, { url: null, label: '...', active: false });
    }

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            {displayedLinks.map((link, index) => (
                <PaginationLink key={index} link={link} />
            ))}
        </div>
    );
};

// Reusable pagination button component
const PaginationLink = ({ link }: { link: { url: string | null; label: string; active: boolean } }) => {
    return link.url ? (
        <Link
            href={link.url}
            dangerouslySetInnerHTML={{ __html: link.label }}
            className={`rounded px-3 py-2 ${link.active ? 'border-b-2 border-white font-bold' : 'text-gray-400'}`}
        />
    ) : (
        <span key={link.label} dangerouslySetInnerHTML={{ __html: link.label }} className="hidden"></span>
    );
};

export default PaginationNav;
