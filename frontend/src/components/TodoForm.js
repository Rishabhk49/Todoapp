import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTodo({
        task,
        dueDate,
      });
      setTask('');
      setDueDate('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className=" flex items-center w-2/3 mt-16 mb-3 mx-auto"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a todo..."
        required
        className="shadow-lg shadow-black ring-2 ring-black ring-offset-2 ring-offset-gray-100 flex-grow p-2 border rounded mr-2"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className=" shadow-lg shadow-black ring-2 ring-black ring-offset-2 ring-offset-gray-100 p-2 border rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
