const counter = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
};

const { createStore } = Redux;
const store = createStore(counter);

store.subscribe(() => {
	render();
});

const Counter = ({
		value,
		onIncrement,
		onDecrement
	}) => {
	return (
		<div>
			<h1>{value}</h1>
			<button onClick={onIncrement}>+</button>
			<button onClick={onDecrement}>-</button>
		</div>
	);
};

const render = () => {
	ReactDOM.render(
		<Counter 
			value={store.getState()}
			onIncrement={() =>
				store.dispatch({
					type: 'INCREMENT'
				})
			}
			onDecrement={() =>
				store.dispatch({
					type: 'DECREMENT'
				})
			}
		/>,
		document.getElementById('app')
	);
};

render();

const addCounter = (state) => {
	return state.concat(0);
};

const removeCounter = (state, index) => {
	return [
		...state.slice(0, index),
		...state.slice(index + 1)
	];
};

const incrementCounter = (state, index) => {
	return [
		...state.slice(0, index),
		1 + state[index],
		...state.slice(index + 1)
	];
};

const testAddCount = () => {
	let list = [],
		expectedList = [0];

	deepFreeze(list);

	expect(
		addCounter(list)
	).toEqual(expectedList);
};

const testRemoveCount = () => {
	let list = [1, 2, 1, 3];

	deepFreeze(list);

	expect(
		removeCounter(list, 1)
	).toEqual([1, 1, 3]);

	expect(
		removeCounter(list, 3)
	).toEqual([1, 2, 1]);
};

const testIncrementCounter = () => {
	let list = [1, 2, 3, 4];

	deepFreeze(list);

	expect(
		incrementCounter(list, 1)
	).toEqual([1, 3, 3, 4]);

	expect(
		incrementCounter(list, 3)
	).toEqual([1, 2, 3, 5]);
};

testAddCount();
testRemoveCount();
testIncrementCounter();

expect(
	counter(0, { type: 'INCREMENT' })
).toEqual(1);

expect(
	counter(0, { type: 'DECREMENT' })
).toEqual(-1);

expect(
	counter(0, { type: 'SOMETHING_ELSE' })
).toEqual(0);

expect(
	counter(undefined, { })
).toEqual(0);

expect(
	counter(undefined, { type: 'INCREMENT' })
).toEqual(1);