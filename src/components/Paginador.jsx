export default function Paginador({ totalPages, currentPage, onPageChange }) {
    if (!totalPages) return null;

    return (
        <div className="my-1 flex justify-center space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-300 text-white' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
            >
                Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => {
                if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            disabled={pageNumber === currentPage}
                            className={`px-4 py-2 border rounded ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
                        >
                            {pageNumber}
                        </button>
                    );
                }
                return null;
            })}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'bg-gray-300 text-white' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
            >
                Siguiente
            </button>
        </div>
    );
}
