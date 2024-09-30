import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo } from './TodoSlice';


const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const handleAddClick = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      }
        setNewTodo('')
  };

  const handleEditClick = (id, text) => {
    if (!todos.find(todo => todo.id === id).completed) {
      setEditId(id);
      setEditText(text);
    }
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      dispatch(editTodo({ id: editId, newText: editText }));
      setEditId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditText('');
  };

  return (
    <div >
      <form onSubmit={handleAddClick}>
       <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new to-do..." />
       <button onClick={handleAddClick}>Add</button>
      </form>
     
      <ul>
        {}
        {activeTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))}/>
            {editId === todo.id ? (
              <div className='edit-buttons'>
                <input className='edit-input' type="text" value={editText}
                  onChange={(e) => setEditText(e.target.value)}/>
                <button className='save-button' onClick={handleSaveEdit}>✔️</button>
                <button className='cancel-button' onClick={handleCancelEdit}>❌ </button>
              </div>
            ) : (
              <span className='todo-text'>{todo.text}</span>
            )}
            <div className='changes'>
            <button className="edit-button" onClick={() => handleEditClick(todo.id, todo.text)}
              disabled={todo.completed} >✏️</button>
            <button className="delete-button delete" onClick={() => dispatch(deleteTodo(todo.id))}>🗑️</button>
            </div>
          </li>
        ))}
        {}
        {completedTodos.map(todo => (
          <li key={todo.id} className="completed">
            <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))} />
            {editId === todo.id ? (
              <div>
                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>
                <button onClick={handleSaveEdit}>✔️</button>
                <button onClick={handleCancelEdit}>❌ </button>
              </div>
            ) : (
              <span className='todo-text'>{todo.text}</span>
            )}
            <div className='changes-disabled'>
            <button onClick={() => handleEditClick(todo.id, todo.text)} disabled={todo.completed}>✏️</button>
            <button className="delete" onClick={() => dispatch(deleteTodo(todo.id))}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;