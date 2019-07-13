import React from 'react';
import axios from 'axios';

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

class Quiz extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			questions: []
		};
	}

	componentDidMount(){
		let url = window.location.href
		let id = url.substr(url.lastIndexOf("/")+1)
		axios.get(`https://quiz-321.herokuapp.com/quiz/${id}`)
		.then(res => {
			this.setState({
				questions: res.data
			})
		})
		.catch(error => {
			console.log(error)
		})
	}

	render() {

		const { questions } = this.state

		return (
			<div>
				<DisplayQuiz questions={questions}/>
			</div>
		)
	}
}

export default Quiz;
