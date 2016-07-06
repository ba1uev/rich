import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.error = (function() {
  var error = console.error
  return function(exception) {
    if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
      error.apply(console, arguments)
    }
  }
})()

ReactDOM.render(<App />, document.getElementById('root'));
