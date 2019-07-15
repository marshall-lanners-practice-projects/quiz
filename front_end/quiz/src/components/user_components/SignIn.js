import React from 'react';
import axios from 'axios';

const state = {
	password: '',
	user_name: '',
}

class SignUp extends React.Component {
	constructor(props){
		super(props);
		this.state = state
	}

	handleChange = event => {
 	  this.setState({[event.target.name]: event.target.value})
 	}

 	login = (event) => {
 		event.preventDefault()
 		const {password, user_name} = this.state

 		let login = {password: password, user_name: user_name}

 		axios.post('https://quiz-321.herokuapp.com/users/login', login)
 		.then(response => {
 			let data = response.data
 			localStorage.setItem('token', data.token)
 			localStorage.setItem('user_id', data.id)
 			this.setState(state)
 		})
 		.catch(error => {
 			console.log(error)
 		})

 	}

	render() {

		const {password, user_name} = this.state

		return (
			<div>
				<form onSubmit={this.register}>
					<input
						type="password"
						placeholder='password'
						onChange={this.handleChange}
						name="password"
						value={password}
					/><br/>
					<input
						type="text"
						placeholder='user name'
						onChange={this.handleChange}
						name="user_name"
						value={user_name}
					/><br/>
				</form>
				<button onClick={this.login}>Submit</button>
			</div>
		)
	}
}

export default SignUp;
