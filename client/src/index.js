import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

// import reportWebVitals from './reportWebVitals';

// Adding redux and reducers 
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

// Creates our store to use our reducers and the chrome extension to debug the redux store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Connects the store to our application
  <Provider store={store}>
        <Header/>
        <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// reportWebVitals();
