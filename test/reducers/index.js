import {expect} from 'chai';
import deepFreeze from 'deep-freeze'

import todosApp from '../../src/reducers';

describe('Index reducers', () => {

	describe('add Todo', () => {

		it('should add todo', () => {
			let action = {
					id: 0,
					type: 'ADD_TODO',
					text: 'Estudar esse tal de Redux'
				}, todoAssigned = {
					id: 0,
					text: 'Estudar esse tal de Redux',
					completed: false
				};

			deepFreeze(action);

			expect(
				todosApp(undefined, action).todos
			).to.deep.equal([todoAssigned]);
		});

	});

	describe('remove Todo', () => {

		it('should remove todo', () => {
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
				stateBefore = {todos: [todo1, todo2]};

			deepFreeze(stateBefore);
			deepFreeze(action);

			expect(
				todosApp(stateBefore, action).todos
			).to.deep.equal([todo1]);
		});

	});

	describe('toogle Todo', () => {

		it('should toogle todo', () => {
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
				stateBefore = {todos: [todo1, todo2]};

			deepFreeze(stateBefore);
			deepFreeze(action);

			expect(
				todosApp(stateBefore, action).todos
			).to.deep.equal([todo1, todoAfter]);
		});

	});

});