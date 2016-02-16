import React from 'react';
import { addTodo } from '../actions';
import { connect } from 'react-redux';

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
export default TodoForm;