'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var counter = function counter() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	var action = arguments[1];

	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

var _Redux = Redux;
var createStore = _Redux.createStore;

var store = createStore(counter);

store.subscribe(function () {
	render();
});

var Counter = function Counter(_ref) {
	var value = _ref.value;
	var onIncrement = _ref.onIncrement;
	var onDecrement = _ref.onDecrement;

	return React.createElement(
		'div',
		null,
		React.createElement(
			'h1',
			null,
			value
		),
		React.createElement(
			'button',
			{ onClick: onIncrement },
			'+'
		),
		React.createElement(
			'button',
			{ onClick: onDecrement },
			'-'
		)
	);
};

var render = function render() {
	ReactDOM.render(React.createElement(Counter, {
		value: store.getState(),
		onIncrement: function onIncrement() {
			return store.dispatch({
				type: 'INCREMENT'
			});
		},
		onDecrement: function onDecrement() {
			return store.dispatch({
				type: 'DECREMENT'
			});
		}
	}), document.getElementById('app'));
};

render();

var addCounter = function addCounter(state) {
	return state.concat(0);
};

var removeCounter = function removeCounter(state, index) {
	return [].concat(_toConsumableArray(state.slice(0, index)), _toConsumableArray(state.slice(index + 1)));
};

var incrementCounter = function incrementCounter(state, index) {
	return [].concat(_toConsumableArray(state.slice(0, index)), [1 + state[index]], _toConsumableArray(state.slice(index + 1)));
};

var testAddCount = function testAddCount() {
	var list = [],
	    expectedList = [0];

	deepFreeze(list);

	expect(addCounter(list)).toEqual(expectedList);
};

var testRemoveCount = function testRemoveCount() {
	var list = [1, 2, 1, 3];

	deepFreeze(list);

	expect(removeCounter(list, 1)).toEqual([1, 1, 3]);

	expect(removeCounter(list, 3)).toEqual([1, 2, 1]);
};

var testIncrementCounter = function testIncrementCounter() {
	var list = [1, 2, 3, 4];

	deepFreeze(list);

	expect(incrementCounter(list, 1)).toEqual([1, 3, 3, 4]);

	expect(incrementCounter(list, 3)).toEqual([1, 2, 3, 5]);
};

testAddCount();
testRemoveCount();
testIncrementCounter();

expect(counter(0, { type: 'INCREMENT' })).toEqual(1);

expect(counter(0, { type: 'DECREMENT' })).toEqual(-1);

expect(counter(0, { type: 'SOMETHING_ELSE' })).toEqual(0);

expect(counter(undefined, {})).toEqual(0);

expect(counter(undefined, { type: 'INCREMENT' })).toEqual(1);