import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './app.css'
import Header from './components/header/Header';
import SummonerDetail from './pages/summoner-detail/SummonerDetail';

const App = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <SummonerDetail />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
