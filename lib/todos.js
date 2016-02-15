'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _Redux = Redux;
var createStore = _Redux.createStore;
var combineReducers = _Redux.combineReducers;
var _ReactRedux = ReactRedux;
var Provider = _ReactRedux.Provider;
var connect = _ReactRedux.connect;
var _React = React;
var Component = _React.Component;


var addTodo = function addTodo(text) {
	return {
		type: 'ADD_TODO',
		id: incrementalId++,
		text: text
	};
};
var toogleTodo = function toogleTodo(id) {
	return {
		type: 'TOOGLE_TODO',
		id: id
	};
};
var _removeTodo2 = function _removeTodo2(id) {
	return {
		type: 'REMOVE_TODO',
		id: id
	};
};
var setVisibilityFilter = function setVisibilityFilter(filter) {
	return {
		type: 'SET_VISIBILITY_FILTER',
		filter: filter
	};
};

var getTodoIndex = function getTodoIndex(state, todo) {
	for (var i = 0, len = state.length; i < len; i++) {
		if (todo.id == state[i].id) return i;
	}
};

var todo = function todo(state, action) {
	switch (action.type) {
		case 'ADD_TODO':
			var item = Object.assign({}, action, {
				completed: false
			});
			delete item.type;
			return item;
		case 'TOOGLE_TODO':
			if (action.id == state.id) return Object.assign({}, state, {
				completed: !state.completed
			});
			return state;
		default:
			return state;
	}
};

var todos = function todos() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'ADD_TODO':
			return state.concat([todo(undefined, action)]);
		case 'REMOVE_TODO':
			var index = getTodoIndex(state, action);

			if (index >= 0) return [].concat(_toConsumableArray(state.slice(0, index)), _toConsumableArray(state.slice(index + 1)));
			return state;
		case 'TOOGLE_TODO':
			return state.map(function (t) {
				return todo(t, action);
			});
		default:
			return state;
	}
};

var visibilityFilter = function visibilityFilter() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? "SHOW_ALL" : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};

var todosFilter = function todosFilter() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	var filter = arguments[1];

	switch (filter) {
		case 'SHOW_ALL':
			return state;
		case 'SHOW_COMPLETED':
			return state.filter(function (t) {
				return t.completed;
			});
		case 'SHOW_UNCOMPLETED':
			return state.filter(function (t) {
				return !t.completed;
			});
	}
};

var todosApp = combineReducers({ todos: todos, visibilityFilter: visibilityFilter });

var Link = function Link(_ref) {
	var children = _ref.children;
	var _onClick = _ref.onClick;
	var active = _ref.active;

	if (active) return React.createElement(
		'span',
		null,
		children
	);
	return React.createElement(
		'a',
		{ href: '#', onClick: function onClick(event) {
				event.preventDefault();_onClick();
			} },
		children
	);
};

var mapStateToLinkProps = function mapStateToLinkProps(state, ownProps) {
	return {
		active: state.visibilityFilter == ownProps.filter
	};
};
var mapDispatchToLinkProps = function mapDispatchToLinkProps(dispatch, ownProps) {
	return {
		onClick: function onClick() {
			return dispatch(setVisibilityFilter(ownProps.filter));
		}
	};
};
var FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

var FilterTodos = function FilterTodos() {
	return React.createElement(
		'p',
		null,
		React.createElement(
			'span',
			null,
			'Mostrar: '
		),
		React.createElement(
			FilterLink,
			{ filter: 'SHOW_ALL' },
			React.createElement(
				'span',
				null,
				'todos'
			)
		),
		', ',
		React.createElement(
			FilterLink,
			{ filter: 'SHOW_COMPLETED' },
			React.createElement(
				'span',
				null,
				'completos'
			)
		),
		', ',
		React.createElement(
			FilterLink,
			{ filter: 'SHOW_UNCOMPLETED' },
			React.createElement(
				'span',
				null,
				'incompletos'
			)
		)
	);
};

var TodoForm = function TodoForm(_ref2) {
	var dispatch = _ref2.dispatch;

	var input = undefined;
	return React.createElement(
		'form',
		{ onSubmit: function onSubmit(event) {
				event.preventDefault();
				dispatch(addTodo(input.value));
				input.value = '';
			} },
		React.createElement('input', { ref: function ref(node) {
				input = node;
			}, placeholder: 'A fiscalização pira' })
	);
};
TodoForm = connect()(TodoForm);

var Todo = function Todo(_ref3) {
	var text = _ref3.text;
	var completed = _ref3.completed;
	var id = _ref3.id;
	var removeTodo = _ref3.removeTodo;
	var _onClick2 = _ref3.onClick;
	return React.createElement(
		'li',
		{ onClick: function onClick() {
				return _onClick2(id);
			}, style: { textDecoration: completed ? 'line-through' : 'none' } },
		text,
		React.createElement(
			'button',
			{ onClick: function onClick() {
					removeTodo(id);
				} },
			'Remover'
		)
	);
};

var Todos = function Todos(_ref4) {
	var todos = _ref4.todos;
	var _removeTodo = _ref4.removeTodo;
	var _onClick3 = _ref4.onClick;
	return React.createElement(
		'ul',
		null,
		todos.map(function (t) {
			return React.createElement(Todo, _extends({}, t, { key: t.id, removeTodo: function removeTodo(id) {
					return _removeTodo(id);
				}, onClick: function onClick(id) {
					return _onClick3(id);
				} }));
		})
	);
};

var mapStateToProps = function mapStateToProps(state) {
	return {
		todos: todosFilter(state.todos, state.visibilityFilter)
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		onClick: function onClick(id) {
			return dispatch(toogleTodo(id));
		},
		removeTodo: function removeTodo(id) {
			return dispatch(_removeTodo2(id));
		}
	};
};

var VisibleTodos = connect(mapStateToProps, mapDispatchToProps)(Todos);

var incrementalId = 0;
var TodoApp = function TodoApp() {
	return React.createElement(
		'div',
		null,
		React.createElement(TodoForm, null),
		React.createElement(VisibleTodos, null),
		React.createElement(FilterTodos, null)
	);
};

ReactDOM.render(React.createElement(
	Provider,
	{ store: createStore(todosApp) },
	React.createElement(TodoApp, null)
), document.getElementById('app'));

var addTodoTest = function addTodoTest() {
	var stateBefore = [],
	    action = {
		id: 0,
		type: 'ADD_TODO',
		text: 'Estudar esse tal de Redux'
	},
	    todoAssigned = {
		id: 0,
		text: 'Estudar esse tal de Redux',
		completed: false
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(todos(stateBefore, action)).toEqual([todoAssigned]);
};

var removeTodoTest = function removeTodoTest() {
	var todo1 = {
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
		type: 'REMOVE_TODO'
	},
	    stateBefore = [todo1, todo2];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(todos(stateBefore, action)).toEqual([todo1]);
};

var toogleTodoTest = function toogleTodoTest() {
	var todo1 = {
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
		type: 'TOOGLE_TODO'
	},
	    todoAfter = {
		id: 1,
		text: 'Talvez estudar esse tal de Redux',
		completed: true
	},
	    stateBefore = [todo1, todo2];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(todos(stateBefore, action)).toEqual([todo1, todoAfter]);
};

addTodoTest();
removeTodoTest();
toogleTodoTest();