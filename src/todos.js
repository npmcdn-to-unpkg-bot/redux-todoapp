const { createStore, combineReducers } = Redux;
const { Provider, connect } = ReactRedux;
const { Component } = React;

const addTodo = text => ({
	type: 'ADD_TODO',
	id: incrementalId++,
	text: text
});
const toogleTodo = id => ({
	type: 'TOOGLE_TODO',
	id: id
});
const removeTodo = id => ({
	type: 'REMOVE_TODO',
	id: id
});
const setVisibilityFilter = filter => ({
	type: 'SET_VISIBILITY_FILTER',
	filter: filter
});

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

const todosFilter = (state = [], filter) => {
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

const Link = ({children, onClick, active}) => {
	if (active)
		return <span>{children}</span>;
	return (
		<a href="#" onClick={event => {event.preventDefault(); onClick()}}>
			{children}
		</a>
	);
};

const mapStateToLinkProps = (state, ownProps) => {
	return { 
		active: state.visibilityFilter == ownProps.filter
	}
};
const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return { 
		onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
	}
};
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

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

let TodoForm = ({dispatch}) => {
	let input;	
	return (
  		<form onSubmit={event => {
			event.preventDefault();
			dispatch(addTodo(input.value));
			input.value = '';
  		}}>
		    <input ref={node => {input = node}} placeholder="A fiscalização pira"/>
		</form>
	);
}
TodoForm = connect()(TodoForm);

const Todo = ({text, completed, id, removeTodo, onClick}) => (
	<li onClick={() => onClick(id)} style={{textDecoration: completed ? 'line-through' : 'none'}}>
		{text}
		<button onClick={() => {removeTodo(id)}}>Remover</button>
	</li>
);

const Todos = ({todos, removeTodo, onClick}) => (
	<ul>
		{todos.map(t => <Todo {...t} key={t.id} removeTodo={id => removeTodo(id)} onClick={id => onClick(id)}/>)}
	</ul>
);

const mapStateToProps = (state) => {
	return {
		todos: todosFilter(
			state.todos,
			state.visibilityFilter
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onClick: id => dispatch(toogleTodo(id)),
		removeTodo: id => dispatch(removeTodo(id))
	}
}

const VisibleTodos = connect(
	mapStateToProps,
	mapDispatchToProps
)(Todos);

let incrementalId = 0;
const TodoApp = () => (
	<div>
		<TodoForm />
		<VisibleTodos />
		<FilterTodos />
	</div>
);

ReactDOM.render(<Provider store={createStore(todosApp)}><TodoApp /></Provider>, document.getElementById('app'));

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
toogleTodoTest()