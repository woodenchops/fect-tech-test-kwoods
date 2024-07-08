import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserSearch } from './components/UserSearch';
import { Table } from './components/Table';
import { UserDetails } from './components/UserDetails';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <UserSearch />
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
};
