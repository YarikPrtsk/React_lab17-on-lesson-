import { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'https://dummyjson.com/todos';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);

  const fetchTodos = async () => {
    setIsLoading(true);
    const skip = (currentPage - 1) * limitPerPage;
    try {
      const response = await axios.get(`${API_URL}?limit=${limitPerPage}&skip=${skip}`);
      setTodos(response.data.todos);
      setTotalTodos(response.data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await axios.post(`${API_URL}/add`, {
        todo: title,
        completed: false,
      });
      setTodos((prev) => [response.data, ...prev]);
      setTotalTodos((prev) => prev + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setTotalTodos((prev) => prev - 1);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    try {
      await axios.put(`${API_URL}/${id}`, { completed: !todo.completed });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const editTodoTitle = async (id, newTitle) => {
    try {
      await axios.put(`${API_URL}/${id}`, { todo: newTitle });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const goToNextPage = () => {
    if (currentPage * limitPerPage < totalTodos) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    fetchTodos();
  }, [currentPage, limitPerPage]);

  const filteredTodos = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    todos: filteredTodos,
    isLoading,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodoTitle,
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimitPerPage,
    searchTerm,
    setSearchTerm,
  };
}
