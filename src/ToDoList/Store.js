import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../ToDoList/TodoSlice';


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (err) {
    
  }
};

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: loadState(), 
});

store.subscribe(() => {
  saveState(store.getState());
});