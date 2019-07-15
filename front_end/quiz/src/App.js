import React from 'react';
import Quizs from './components/quiz_components/Quizs';
import Quiz from './components/quiz_components/Quiz';
import CreateQuiz from './components/quiz_components/CreateQuiz';
import SignUp from './components/user_components/SignUp';
import SignIn from './components/user_components/SignIn';
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Route exact path='/' component={Quizs}/>
      <Route path='/:id' component={Quiz}/>
      <Route path='/create' component={CreateQuiz}/>
      <Route path='/SignUp' component={SignUp}/>
      <Route path='/SignIn' component={SignIn}/>
    </div>
  );
}

export default App;
