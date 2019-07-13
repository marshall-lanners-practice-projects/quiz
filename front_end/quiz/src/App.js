import React from 'react';
import Quizs from './components/quiz_components/Quizs';
import Quiz from './components/quiz_components/Quiz';
import CreateQuiz from './components/quiz_components/CreateQuiz'
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
