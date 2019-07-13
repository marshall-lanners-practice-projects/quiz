import React from 'react';
import axios from 'axios';
import DisplayQuizs from './DisplayQuizs';

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
