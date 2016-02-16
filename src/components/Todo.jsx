import React from 'react';

const Todo = ({text, completed, id, removeTodo, onClick}) => (
	<li onClick={() => onClick(id)} style={{textDecoration: completed ? 'line-through' : 'none'}}>
		{text}
		<button onClick={() => {removeTodo(id)}}>Remover</button>
	</li>
);
export default Todo;