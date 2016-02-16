import React from 'react';
import { setVisibilityFilter } from '../actions';
import { connect } from 'react-redux';
import Link from '../components/Link';

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
export default FilterLink;
