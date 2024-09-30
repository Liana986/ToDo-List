import React from 'react';
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './ToDoList/Store';
import Home from './ToDoList/Header/Home';
import About from './ToDoList/Header/AboutUs';
import Contact from './ToDoList/Header/ContactUs';
import Logo from './ToDoList/Header/Logo';
import './App.css';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <header>
            <nav>
            <Logo />
            <div className='header-items'>
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
              </div>
            </nav>
            <Outlet />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;