import React from 'react';
import FilterLink from '../containers/FilterLink';

const FilterTodos = () =>  (
	<div>
		<FilterLink filter="SHOW_ALL" label={"Todos"} />
		<FilterLink filter="SHOW_COMPLETED" label={"Completos"} />
		<FilterLink filter="SHOW_UNCOMPLETED" label={"Incompletos"} />
	</div>
);
export default FilterTodos;