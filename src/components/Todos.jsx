import React from 'react';
import Todo from './Todo';

const Todos = ({todos, removeTodo, onClick}) => (
	<ul>
		{todos.map(t => <Todo {...t} key={t.id} removeTodo={id => removeTodo(id)} onClick={id => onClick(id)}/>)}
	</ul>
);
export default Todos;