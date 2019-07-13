import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

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

class Quizs extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			quizs: []
		};
	}

	componentDidMount(){
		axios.get('https://quiz-321.herokuapp.com/quiz')
		.then(res => {this.setState({quizs: res.data})
		})
		.catch(error => {
			console.log(error)
		})
	}

	render() {

		const { quizs } = this.state

		return (
			<div>
				<DisplayQuizs quizs={quizs}/>
			</div>
		)
	}
}

export default Quizs;
