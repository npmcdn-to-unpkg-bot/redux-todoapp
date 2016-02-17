import React from 'react';
import Todo from './Todo';
import List from 'material-ui/lib/lists/list';

const Todos = ({todos, removeTodo, onClick}) => (
	<List subheader="Todos">
		{todos.map(t => <Todo {...t} key={t.id} removeTodo={id => removeTodo(id)} onClick={id => onClick(id)}/>)}
	</List>
);
export default Todos;