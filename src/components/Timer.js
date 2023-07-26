import React from 'react';
import { useEffect } from 'react';

function Timer({ dispatch, secondsRemainings }) {
	const mins = Math.floor(secondsRemainings / 60);
	const seconds = secondsRemainings % 60;
	useEffect(
		function () {
			const Id = setInterval(() => {
				dispatch({ type: 'tick' });
			}, 1000);

			return () => clearInterval(Id);
		},
		[dispatch]
	);

	return (
		<div className='timer'>
			{mins < 10 ? `0${mins}` : mins} : {seconds < 10 ? `0${seconds}` : seconds}
		</div>
	);
}

export default Timer;
