import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import { HashRouter } from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react'


ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate Loading={null} persistor = {persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
