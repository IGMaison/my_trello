import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * TODO: по неймингу компонентов я уже писал в прошлом ревью (в частности про welcome и card_sticker)
 * в компоненте comments у тебя лежат comment, хотя comments это просто лист (контейнер) для комментов,
 * и наверное он имеет больше отношения к column,
 * а вот comment это самостоятельный компонент со своей логикой
 * поэтому он должен быть или выше comments или хотя бы на одном уровне
 */
