import React from 'react';
import { useQuiz } from '../context/QuizContext';

function FinishedScreen() {
	const { points, maxPoints, highScore, dispatch } = useQuiz();
	const percentage = (points / maxPoints) * 100;
	let emoji;
	if (percentage === 100) emoji = '🌟';
	if (percentage >= 80 && percentage < 100) emoji = '🏇';
	if (percentage >= 50 && percentage < 80) emoji = ' 🤔 ';
	if (percentage > 0 && percentage < 50) emoji = ' 😮‍💨 ';
	if (percentage === 0) emoji = ' 🤦 ';

	return (
		<>
			<p className='result'>
				{emoji} You scored <strong>{points}</strong> out of {maxPoints} (
				{percentage.toFixed(1)}%)
			</p>
			<p className='highscore'>(Highscore:{highScore} points)</p>
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'restart' })}
			>
				Restart Quiz!
			</button>
		</>
	);
}

export default FinishedScreen;
