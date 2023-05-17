import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import store from './app/store';
import Main from './pages/main/Main';
import Person from "./pages/person/Person";

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className='container'>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/person/:id" element={<Person/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  </Provider>
);
