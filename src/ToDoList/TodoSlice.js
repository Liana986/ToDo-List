import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const TodoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const now = new Date().toISOString();
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: now,
        completedAt: null,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload); 
      if (todo) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ?
        new Date().toISOString() : null;
      }
      },

    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const index = state.findIndex(todo => todo.id === id);
      if (index !== -1) {
        state[index].text = newText;
      }
    }
    },
  });

export const { addTodo, toggleTodo, deleteTodo, editTodo } = TodoSlice.actions;
export default TodoSlice.reducer;