import React from 'react';
import FilterLink from '../containers/FilterLink';

const FilterTodos = () =>  (
	<p>
		<span>Mostrar: </span> 
		<FilterLink filter="SHOW_ALL">
			<span>todos</span>
		</FilterLink>
		{', '}
		<FilterLink filter="SHOW_COMPLETED">
			<span>completos</span>
		</FilterLink>
		{', '}
		<FilterLink filter="SHOW_UNCOMPLETED">
			<span>incompletos</span>
		</FilterLink>
	</p>
);
export default FilterTodos;