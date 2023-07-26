import { createContext, useContext, useReducer, useEffect } from 'react';

const secondsPerQuestion = 30;

const QuizContext = createContext();

const initialState = {
	questions: [],
	// 'loading', 'error', 'ready', 'active', 'finished'
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	secondsRemainings: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'dataFailed':
			return { ...state, status: 'error' };
		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemainings: state.questions.length * secondsPerQuestion,
			};
		case 'newAnswer':
			// const question = state.questions[state.index].correctOption
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case 'nextQuestion':
			return { ...state, index: state.index + 1, answer: null };
		case 'finish':
			return {
				...state,
				status: 'finished',
				highScore:
					state.points > state.highScore ? state.points : state.highScore,
			};
		case 'restart':
			return { ...state, status: 'ready', index: 0, answer: null, points: 0 };
		case 'tick':
			return {
				...state,
				secondsRemainings: state.secondsRemainings - 1,
				status: state.secondsRemainings === 0 ? 'finished' : state.status,
			};
		default:
			throw new Error('Unknown Action');
	}
};

function QuizProvider({ children }) {
	const [
		{ questions, status, index, answer, points, highScore, secondsRemainings },
		dispatch,
	] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch('http://localhost:5000/questions')
			.then((res) => res.json())
			.then((data) => dispatch({ type: 'dataReceived', payload: data }))
			.catch((err) => dispatch({ type: 'dataFailed' }));
	}, []);

	const maxPoints = questions.reduce(
		(acc, cur, index, arr) => acc + cur.points,
		0
	);
	const context = {
		questions,
		status,
		index,
		answer,
		points,
		highScore,
		secondsRemainings,
		dispatch,
		numQuestions: questions.length,
		maxPoints,
	};
	return (
		<QuizContext.Provider value={context}>{children}</QuizContext.Provider>
	);
}

function useQuiz() {
	if (useContext(QuizContext) === undefined)
		throw new Error('Cannot be used here');

	return useContext(QuizContext);
}

export { useQuiz };
export default QuizProvider;
