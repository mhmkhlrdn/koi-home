const SecondaryHeader = ({ title }: any) => {
    return (
        <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-600 px-4 py-2 shadow-md">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex"></div>
        </div>
    );
};

export default SecondaryHeader;
