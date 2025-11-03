import React,{ useMemo, useCallback } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoList from './TodoList';
import PaginationControls from './PaginationControls';
import SearchBar from './SearchBar';
//треба доробити
export default function TodoListContainer() {
  const {
    todos,
    isLoading,
    error,
    deleteTodo,
    toggleTodo,
    editTodoTitle,
    currentPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    searchTerm,
    setSearchTerm,
  } = useTodos();

  return (
    <div className="todo-list-wrapper">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodoTitle}
      />
      <PaginationControls
        currentPage={currentPage}
        totalTodos={totalTodos}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      />
    </div>
  );
}
