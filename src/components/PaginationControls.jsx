export default function PaginationControls({
  currentPage,
  totalTodos,
  goToNextPage,
  goToPrevPage,
}) {
  return (
    <div className="pagination-controls">
      <button onClick={goToPrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button
        onClick={goToNextPage}
        disabled={currentPage * 10 >= totalTodos}
      >
        Next
      </button>
    </div>
  );
}
