import React from 'react'

const DisplayQuiz = ({questions}) => {
	return (
		<ul>
			{questions.map((q, i) => {
				return (
					<li key={i}>{q.question},<br/>{q.answer}</li>
				)
			})}
		</ul>
	)
}

export default DisplayQuiz