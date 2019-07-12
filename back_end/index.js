require('dotenv').config()

const express = require('express');
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

const userRoutes = require('./Routes/userRoutes')
const quizRoutes = require('./Routes/quizRoutes')
const questionsRoutes = require('./Routes/questionsRoutes')

server.use('/users', userRoutes)
server.use('/quiz', quizRoutes)
server.use('/questions', questionsRoutes)


const port = process.env.PORT || 4000

server.listen(port, () => console.log(`server running on port ${port}`));