import React from 'react';
import { setVisibilityFilter } from '../actions';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/lib/flat-button';

const mapStateToLinkProps = (state, ownProps) => {
	return { 
		disabled: state.visibilityFilter == ownProps.filter,
		secondary: true
	}
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return { 
		onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
	}
};

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(FlatButton);
export default FilterLink;
