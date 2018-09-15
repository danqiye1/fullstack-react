import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import combineReducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css';

/** Some Explanations:
 * The top level architecture is a combination of index.js and App.js.
 * index.js - Entry point and handles Redux Dataflows
 * App.js - Handles react-router for client side routing.
 */
const store = createStore(combineReducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);