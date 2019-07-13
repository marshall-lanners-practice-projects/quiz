const express = require('express');
const router = express.Router();
const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const dbConfig = require('../knexfile')[environment]
const db = knex(dbConfig)

// Create
// create a new question set
//-------------------------------------------
router.post('', (req, res) => {

	const { question_array } = req.body

	console.log(question_array)

	db.insert(question_array).into('questions')
	.then(response => {
		return res.status(200).json(response)
	})
	.catch(error => {
		console.log(error)
		return res.status(500).json(error)
	})

})


module.exports = router;