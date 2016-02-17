import React from 'react';
import { addTodo } from '../actions';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';

let TodoForm = ({dispatch}) => {
	let input;	
	return (
  		<form onSubmit={event => {
			event.preventDefault();
			dispatch(addTodo(input.getValue()));
			input.value = '';
  		}}>
		    <TextField ref={node => {input = node}} placeholder="A fiscalização pira"/>
		</form>
	);
}

TodoForm = connect()(TodoForm);
export default TodoForm;