import React from 'react';
import axios from 'axios';

const state = {
	password: '',
	password_confirmation: '',
	user_name: '',
	email: ''
}

class SignUp extends React.Component {
	constructor(props){
		super(props);
		this.state = state
	}

	handleChange = event => {
 	  this.setState({[event.target.name]: event.target.value})
 	}

 	register = (event) => {
 		event.preventDefault()
 		const {password, password_confirmation, user_name, email} = this.state

 		if (password !== password_confirmation){return}

 		let user = {password: password, user_name: user_name, email: email}

 		axios.post('https://quiz-321.herokuapp.com/users/register', user)
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

		const {password, password_confirmation, user_name, email} = this.state

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
						type="password"
						placeholder='password confirmation'
						onChange={this.handleChange}
						name="password_confirmation"
						value={password_confirmation}
					/><br/>
					<input
						type="text"
						placeholder='user name'
						onChange={this.handleChange}
						name="user_name"
						value={user_name}
					/><br/>
					<input
						type="text"
						placeholder='email'
						onChange={this.handleChange}
						name="email"
						value={email}
					/>
				</form>
				<button onClick={this.register}>Submit</button>
			</div>
		)
	}
}

export default SignUp;
