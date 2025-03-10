import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gamereducer, nextStep } from '../reducers/gamereducer';

const Maze = () => {
	const { description, actions } = useSelector(
		(store) => store.gamereducer.currentPosition
	);
	const dispatch = useDispatch();

	const handleButtonClick = (type, direction) => {
		dispatch(nextStep(type, direction));
	};

	const NextAction = ({ description, type, direction }) => (
		<div className='next-action'>
			<p>{description}</p>
			<button onClick={() => handleButtonClick(type, direction)}>
				{type} {direction}
			</button>
		</div>
	);

	const history = useSelector((store) => store.gamereducer.history);

	const goBack = () => {
		dispatch(gamereducer.actions.setHistory());
	};

	return (
		<>
			<div className='clue-wrapper'>
				<button
					className='back-button'
					disabled={!history.length}
					onClick={goBack}>
					Go back
				</button>

				<section className='clue'>
					<h2>{description}</h2>
					{actions.length === 0 && <h3>Yes! you found your way out!</h3>}
					{actions.length > 0 &&
						actions.map((item) => (
							<NextAction key={item.direction} {...item} />
						))}
				</section>
			</div>
		</>
	);
};

export default Maze;
