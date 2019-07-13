import React from 'react';
import Quizs from './components/Quizs';
import Quiz from './components/Quiz';
import CreateQuiz from './components/CreateQuiz'
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Route exact path='/' component={Quizs}/>
      <Route path='/:id' component={Quiz}/>
      <Route path='/create' component={CreateQuiz}/>
    </div>
  );
}

export default App;
