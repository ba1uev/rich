import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StickyContainer } from 'react-sticky';

console.error = (function() {
  var error = console.error
  return function(exception) {
    if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {
      error.apply(console, arguments)
    }
  }
})()

ReactDOM.render(
  (<StickyContainer>
    <App />
  </StickyContainer>),
  document.getElementById('root')
);
