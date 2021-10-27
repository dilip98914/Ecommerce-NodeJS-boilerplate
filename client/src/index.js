import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// function loadScript(src) {
//   const script = document.createElement('script')
//   script.src = src
//   document.body.appendChild(script)
//   script.onload = () => {
    
//   }
//   script.onerror = () => {
//     console.log('error loading mdn bootstrap!')
//     return;
//   }
// }

// loadScript('js/mdb.min.js');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);