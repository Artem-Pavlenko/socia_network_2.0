import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";



const store = {
    users: [
        {id: 1, name: "Artem"},
        {id: 2, name: "Dima"},
        {id: 3, name: "Alex"},
        {id: 4, name: "Yarik"},
        {id: 5, name: "Bob"}
        ],
    mess: [
        {id: 1, message: 'React'},
        {id: 2, message: 'Redux'},
        {id: 3, message: 'Hooks'},
        {id: 4, message: 'hoc'}
        ],
    posts: [
        {id: 1, post: 'react', likesCount: 33},
        {id: 2, post: 'Redux', likesCount: 25},
        {id: 3, post: 'Thunk', likesCount: 22},
        {id: 4, post: 'Hooks', likesCount: 19},
        {id: 5, post: 'text text text text text text text text text text text text text text', likesCount: 11},
        {id: 6, post: 'text text text text text text text text text text text text text text', likesCount: 5},
        {id: 7, post: 'text text text text text text text text text text text text text text', likesCount: 1}
    ]
}

export type StoreType = typeof store

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App store={store}/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
