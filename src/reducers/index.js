import { combineReducers } from 'redux';

const getTodoIndex = (state, todo) => {
	for (let i = 0, len = state.length; i < len; i++)
		if (todo.id == state[i].id)
			return i;
};

const todo = (state, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			var item = Object.assign({}, action, {
				completed: false
			});
			delete item.type;
			return item;
		case 'TOOGLE_TODO':
			if (action.id == state.id)
				return Object.assign({}, state, {
					completed: !state.completed
				});
			return state;
		default:
			return state;
	}
}

const todos = (state = [], action) => {
	switch(action.type) {
		case 'ADD_TODO': 
			return state.concat([todo(undefined, action)]);
		case 'REMOVE_TODO':
			var index = getTodoIndex(state, action);

			if (index >= 0)
				return [
					...state.slice(0, index),
					...state.slice(index + 1)
				];
			return state;
		case 'TOOGLE_TODO':
			return state.map(t => todo(t, action));
		default:
			return state;
	}
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
	switch(action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};

export const todosFilter = (state = [], filter) => {
	switch(filter) {
		case 'SHOW_ALL':
			return state
		case 'SHOW_COMPLETED':
			return state.filter(t => t.completed);
		case 'SHOW_UNCOMPLETED':
			return state.filter(t => !t.completed);
	}
}

const todosApp = combineReducers({todos, visibilityFilter});
export default todosApp;