import React from 'react';
import { addTodo } from '../actions';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';

let TodoForm = ({dispatch}) => {
	let input;
	return (
	    <TextField ref={node => {input = node}} placeholder="Mais um todo"
	    	onEnterKeyDown={event => {
				event.preventDefault();
				dispatch(addTodo(input.getValue()));
				input.setValue('');
	  		}}/>
	);
}

TodoForm = connect()(TodoForm);
export default TodoForm;