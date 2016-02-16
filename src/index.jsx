import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from './store';
import TodoApp from './containers/App';

ReactDOM.render(<Provider store={store}><TodoApp /></Provider>, document.getElementById('app'));
/*
const addTodoTest = () => {
	let stateBefore = [],
		action = {
			id: 0,
			type: 'ADD_TODO',
			text: 'Estudar esse tal de Redux'
		}, todoAssigned = {
			id: 0,
			text: 'Estudar esse tal de Redux',
			completed: false
		};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual([todoAssigned]);
};

const removeTodoTest = () => {
	let todo1 = {
			id: 0,
			text: 'Estudar esse tal de Redux',
			completed: true
		},
		todo2 = {
			id: 1,
			text: 'Talvez estudar esse tal de Redux',
			completed: false
		},
		action = {
			id: 1,
			type: 'REMOVE_TODO',
		},
		stateBefore = [todo1, todo2];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual([todo1]);
};

const toogleTodoTest = () => {
	let todo1 = {
			id: 0,
			text: 'Estudar esse tal de Redux',
			completed: false
		},
		todo2 = {
			id: 1,
			text: 'Talvez estudar esse tal de Redux',
			completed: false
		},
		action = {
			id: 1,
			type: 'TOOGLE_TODO',
		},
		todoAfter = {
			id: 1,
			text: 'Talvez estudar esse tal de Redux',
			completed: true
		},
		stateBefore = [todo1, todo2];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual([todo1, todoAfter]);
};

addTodoTest();
removeTodoTest();
toogleTodoTest()*/