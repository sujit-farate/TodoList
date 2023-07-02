import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = (todo) => {
    const updatedTodos = [...todos, { text: todo, isEditing: false }];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const editTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isEditing = true;
    setTodos(updatedTodos);
    setEditingIndex(index);
  };

  const saveTodo = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    updatedTodos[index].isEditing = false;
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setEditingIndex(-1);
  };

  const handleEditChange = (event, index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = event.target.value;
    setTodos(updatedTodos);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const todo = event.target.elements.todo.value;
    addTodo(todo);
    event.target.reset();
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  value={todo.text}
                  onChange={(event) => handleEditChange(event, index)}
                />
                <button onClick={() => saveTodo(index, todo.text)}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => editTodo(index)}>Edit</button>
              </>
            )}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="todo" placeholder="Add a new todo" required />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoList;
