import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://todoapp-2cor.onrender.com/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post('https://todoapp-2cor.onrender.com/todos', newTodo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.patch(`https://todoapp-2cor.onrender.com/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todoapp-2cor.onrender.com/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen"> 
      <div className="container mx-auto p-4 shadow-lg ring-2 ring-blue-400 ring-offset-2 ring-offset-blue-100 border rounded"> {/* Blue shadow effect */}
        <h1 className="text-4xl font-bold mb-4">Todo List</h1>
        <TodoForm onAddTodo={addTodo} />
        <ul className="list-none p-0">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdateTodo={updateTodo}
              onDeleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
