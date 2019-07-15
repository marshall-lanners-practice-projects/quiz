const express = require('express');
const router = express.Router();
const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const dbConfig = require('../knexfile')[environment]
const db = knex(dbConfig)


// Create
// create a new quiz
//-------------------------------------------
router.post('', (req, res) => {

	const { name, type, user_id } = req.body

	db.insert({name, type, user_id}).into('quiz')
	.then(response => {
		return res.status(200).json(response)
	})
	.catch(error => {
		console.log(error)
		return res.status(500).json(error)
	})

})

// Get
// Get all completed quiz's
//-------------------------------------------
router.get('', (req, res) => {
	db('quiz')
	.where({completed: true})
	.then(response => {
		return res.status(200).json(response)
	})
	.catch(error => {
		return res.status(500).json(error)
	})

})

// Get
// Get all questions from a quiz
//-------------------------------------------
router.get('/:id', (req, res) => {

	const { id } = req.params
	
	db('quiz')
	.join('questions', 'quiz.id', 'questions.quiz_id')
	.where({quiz_id: id})
	.select('question', 'answer')
	.then(response => {
		return res.status(200).json(response)
	})
	.catch(error => {
		return res.status(500).json(error)
	})

})


// Get
// Get all quiz's from a user
//-------------------------------------------
router.get('/by_user', (req, res) => {

	const { user_id } = req.body

	db('users')
	.join('quiz', 'users.id', 'quiz.user_id')
	.where({user_id})
	.select('quiz.id', 'name', 'type', 'completed')
	.then(response => {

		let data = response.data, rdy = [], pend = []

		for (let i = 0; i < data.length; i++){
			data[i].completed === true ? (rdy.push(data[i])) : pend.push(data[i])
		}

		return res.status(200).json({ready: rdy, pending: pend})
	})
	.catch(error => {
		console.log(error)
		return res.status(500).json(error)
	})
})

module.exports = router;