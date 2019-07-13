import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import ReactDataGrid from 'react-data-grid';

const options = [
	{value: 'classic', label: 'Classic'},
	{value: 'slideShow', label: 'Slide Show'}
]

const state = {
	selectedValue: {value: 'classic', label: 'Classic'},
	questionsCount: 1,
	rows: [{question: "", answer: ""}],
	columns: [
		{ key: "question", name: 'Question', editable: true },
		{ key: "answer", name: "Answer", editable: true },
	],
	quizName: ''
}


class CreateQuiz extends React.Component {
	constructor(props){
		super(props);
		this.state = state
	}

	onGridRowsUpdated = ({fromRow, toRow, updated}) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

	handleSelect = selectedValue => {this.setState({ selectedValue })}

	updateName = (event) => {this.setState({[event.target.name]: event.target.value})}

  lessQuestions = (name, newTotal) => {
		this.setState({
			[name]: newTotal,
			rows: this.state.rows.slice(0, newTotal)
		})
  }

  moreQuestions = (name, newTotal, current) => {
  	let arr = [...this.state.rows]

		while(current < newTotal ) {
			arr.push({question: "", answer: ""})
			current++
		}

		this.setState({[name]: newTotal, rows: arr})
  }

	handleQuestions = event => {

		let newTotal = Number(event.target.value)
		let name = event.target.name
		let current = this.state.rows.length

		if (newTotal > 15 || newTotal < 0) {return}

		newTotal < current && this.lessQuestions(name, newTotal)
		newTotal >= current && this.moreQuestions(name, newTotal, current)
		
 	}

 	addQuestions = (id) => {

 		let question_array = this.state.rows
 		question_array.forEach(q => {q['quiz_id'] = id})

  	axios.post(`https://quiz-321.herokuapp.com/questions`, {question_array})
  	.then(res => {
  		this.setState(state)
  	})
  	.catch(error => {
  		console.log(error)
  	})
  }

  createQuiz = (event) => {
		event.preventDefault()

  	const {quizName, selectedValue, rows} = this.state
  	
  	if (rows.length === 0 || !selectedValue){return}

  	let obj = {name: quizName, type: selectedValue.value, user_id: 2}

  	axios.post('https://quiz-321.herokuapp.com/quiz', obj)
  	.then((res) => {
  		this.addQuestions(res.data.id)
  	})
  	.catch(error => {
  		console.log(error)
  	})

  }

	render() {

		const { selectedValue, questionsCount, columns, rows, quizName } = this.state;

		return (
			<div>
				<input
					name="quizName"
					placeholder="quiz name"
					onChange={this.updateName}
					value={quizName}
				/>

				<Select
				  value={selectedValue}
				  defaultValue={selectedValue}
				  onChange={this.handleSelect}
				  options={options}
				/>

				<input 
					name="questionsCount"
					onChange={this.handleQuestions}
					value={questionsCount}
					type="number"
					max="15"
					min="1"
				/>

				<ReactDataGrid
				  columns={columns}
				  rowGetter={i => rows[i]}
				  rowsCount={questionsCount}
				  onGridRowsUpdated={this.onGridRowsUpdated}
				  enableCellSelect={true}
				/>
				
				<button onClick={this.createQuiz}>Create Quiz</button>
			</div>
		)
	}
}

export default CreateQuiz;
