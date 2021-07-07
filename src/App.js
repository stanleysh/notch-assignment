import React from 'react';
import './App.css';
import Header from './components/Header';
import OrdersFilter from './components/OrdersFilter';
import OrdersTable from './components/OrdersTable';

function App() {
  return (
    <div className='app'>
      <Header />
      <OrdersFilter />
      <OrdersTable />
    </div>
  );
}

export default App