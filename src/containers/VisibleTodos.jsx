import React from 'react';
import { toogleTodo, removeTodo } from '../actions';
import { todosFilter } from '../reducers';
import { connect } from 'react-redux';
import Todos from '../components/Todos';

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
export default VisibleTodos;