import React from 'react';
import { Link } from "react-router-dom";

const DisplayQuizs = ({quizs}) => {
	return (
		<ul>
			{quizs.map((quiz, i) => {
				return (
					<li key={i}>
						{quiz.name}, {quiz.type} 
						<span><Link to={`/${quiz.id}`}>view</Link></span>
					</li>
				)
			})}
		</ul>
	)
}

export default DisplayQuizs;
