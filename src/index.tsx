import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import './app.styl'
import Header from './components/header/Header';
import SummonerDetail from './pages/summoner-detail/SummonerDetail';
import { CommonLoadingPanel } from './components/common-loading-panel';
import { Provider } from 'react-redux';
import { store } from './redux';
import { Summoner } from './core/model';
import { getSummoner } from './core/api'

const App = () => {
  const [user, setUser] = useState<Summoner | null>(null)

  const handleSelectSummoner = async (name: string) => {
    try {
      const userData = await getSummoner(name)
      const summoner: Summoner = userData.data.summoner
      setUser(summoner)
    } catch (err) { console.log(err) }
  }

  return (
    <>
      <CommonLoadingPanel />
      <div className="page-wrapper">
        <Header handleSelectSummoner={handleSelectSummoner}/>
        <SummonerDetail data={user}/>
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
