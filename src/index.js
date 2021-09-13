import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers'
import App from './components/App';
import thunk from 'redux-thunk';

ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))} >
        <App />
    </Provider>,
    document.getElementById("root")
)