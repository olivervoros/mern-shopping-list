import React from 'react';
import {render} from 'react-dom';
import * as serviceWorker from './serviceWorker';
//import AppWithRedux from './AppWithoutRedux';
//import AppWithoutRedux from './AppWithoutRedux';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import reducer from './store/reducers/shoppinglistreducer';
import thunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(thunk));


//render(<AppWithoutRedux/>, document.getElementById('root'));
//render(<Provider store={store}><AppWithRedux/></Provider>, document.getElementById('root'));
render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
