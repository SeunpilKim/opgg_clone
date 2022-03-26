import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './app.css'
import Header from './components/header/Header';
import SummonerDetail from './pages/summoner-detail/SummonerDetail';
import { CommonLoadingPanel } from './components/common-loading-panel';
import { Provider } from 'react-redux';
import { store } from './redux';

const App = () => {
  return (
    <>
      <CommonLoadingPanel />
      <div className="page-wrapper">
        <Header handleSelectSummoner={(name: string) => { console.log(name) }}/>
        <SummonerDetail />
      </div>
    </>
  );
}

ReactDOM.render(
  <Provider store={store}>
        <App />
  </Provider>,
  document.getElementById('root')
);
