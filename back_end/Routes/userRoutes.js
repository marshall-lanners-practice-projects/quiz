const express = require('express');
const router = express.Router();
const knex = require('knex')
const environment = process.env.NODE_ENV || 'development'
const dbConfig = require('../knexfile')[environment]
const db = knex(dbConfig)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.DB_PASS
const jwt_id = process.env.DB_HOST

function generateToken(user){
	const payload = {
		user_name: user.user_name,
	};
	const options = {
		expiresIn: '4h',
		jwtid: jwt_id,
	}
	return jwt.sign(payload, secret, options)
}

// Create
// create a new user
//-------------------------------------------
router.post('/register', (req, res) => {
	let  {user_name, email, password} = req.body
	password = bcrypt.hashSync(password, 13)
	db('users')
		.insert({user_name, email, password})
		.then(ids => {
			db('users') 
				.where({user_name, email, password})
				.first()
				.then(user => {
					const token = generateToken(user);
					return res.status(201).json({token, id: user.id, name: user.user_name})
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({msg: 'error generating token'})
				})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err)
		})
})

// Create
// create a new user session
//-------------------------------------------
router.post('/login', (req, res) => {
	const creds = req.body;
	db('users')
		.where({user_name: creds.user_name})
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)) {
				//console.log(user)
				const token = generateToken(user);
				res.status(200).json({token, id: user.id, name: user.user_name})
			} else {
				res.status(401).json({msg: 'You have failed to log in'})
			} 
		})
		.catch(error => {
			console.log(error)
			res.status(500).json(error)
		})
})

// Update
// update a users name/email
//-------------------------------------------
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { user_name, email  } = req.body;
	//make sure form is filled out
	if(!req.body.user_name || !req.body.email){
		return res.status(400).json({msg: 'please provide information'})
	}
	db('users')
	.where({id})
	.update({user_name, email })
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'there was an error updating session'})
	})
})

// Delete
// delete a users name/email
//-------------------------------------------
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db('users')
	.where({id})
	.del()
	.then(response => {
		if (response === 0){
			return res.status(404).json({msg: 'no user to delete'})
		}
		return res.status(200).json(response)
	})
	.catch(error => {
		console.log(error)
		return res.status(500).json(error)
	})
})

module.exports = router;