import React from 'react';

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const toggleCompletion = () => {
    onUpdateTodo(todo._id, { completed: !todo.completed });
  };

  return (
    <li className=" w-2/3 mx-auto shadow-lg shadow-black ring-2 ring-black ring-offset-2 ring-offset-gray-100 mt-7 mb-4">
      <div className="flex items-center  ">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleCompletion}
          className="mr-2"
        />
        <span className={`mr-4 text-bold  ${todo.completed ? 'line-through' : ''}`}>
          {todo.task}
        </span>
        <span className="text-sm  text-gray-700">
          {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No due date'}
        </span>
      </div>
      <button
        onClick={() => onDeleteTodo(todo._id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
