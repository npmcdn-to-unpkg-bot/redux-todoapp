import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './store';
import TodoApp from './containers/App';

ReactDOM.render(<Provider store={store}><TodoApp /></Provider>, document.getElementById('app'));