export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
    return (
        <div className="flex justify-center my-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-full border transition ${currentPage === i + 1
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}