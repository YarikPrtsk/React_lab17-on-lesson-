# Address Book - React Project
#### Patterns
Container / Presentational components

Custom Hooks for data fetching and state management

Client-side search

Pagination

Inline editing of todo titles

Proper component data flow using props and callbacks
#### Diagram
```mermaid
graph TD;
    App["App
    - Composition Root
    - Renders TodoListContainer"] 

    TodoListContainer["TodoListContainer (Container)
    - Manages state via useTodos
    - Passes handlers & props to children"] 

    SearchBar["SearchBar (Presentational)
    - Props: searchTerm, setSearchTerm"] 

    TodoList["TodoList (Presentational)
    - Props: todos, onToggle, onDelete, onEdit"] 

    TodoItem["TodoItem (Presentational)
    - Props: todo, onToggle, onDelete, onEdit
    - Handles local edit state"] 

    PaginationControls["PaginationControls (Presentational)
    - Props: currentPage, totalTodos, goToNextPage, goToPrevPage"]

    App --> TodoListContainer
    TodoListContainer --> SearchBar
    TodoListContainer --> TodoList
    TodoListContainer --> PaginationControls
    TodoList --> TodoItem
