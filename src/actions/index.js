export const ADD_TODO = 'ADD_TODO';
export const TOOGLE_TODO = 'TOOGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

let incrementalId = 0;

export function addTodo(text) {
	return {
		type: ADD_TODO,
		id: incrementalId++,
		text: text		
	};
};

export function toogleTodo(id) {
	return {
		type: TOOGLE_TODO,
		id: id
	};
};

export function removeTodo(id) {
	return {
		type: REMOVE_TODO,
		id: id
	};
};

export function setVisibilityFilter(filter) {
	return {	
		type: SET_VISIBILITY_FILTER,
		filter: filter
	};
};
