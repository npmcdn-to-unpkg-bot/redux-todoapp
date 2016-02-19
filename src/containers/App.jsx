import React from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import TodoForm from './TodoForm';
import VisibleTodos from './VisibleTodos';
import FilterTodos from '../components/FilterTodos';

const TodoApp = () => (
	<div>
		<TodoForm />
		<VisibleTodos />
		<FilterTodos />
	</div>
);
export default TodoApp;