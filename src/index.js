import React, { Component } from 'react'
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/style.css';
import quizService from './quizService/index.js'; //quizService name at use the 14th line
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';

class QuizApp extends Component { 
  state={
       questionBank: [], //questionBox name any name use to run But I changed to questionBank.
       score:0,
       responses:0
      }
  getQuestions =() => { 
  quizService().then(question=>{
    this.setState({
         questionBank:question
    })
     })
      }
  computeAnswer = (answer,correctAnswer) => {
     if(answer === correctAnswer) {
       this.setState({
         score: this.state.score +1
       })
      }
       this.setState({
         responses: this.state.responses<5 ? this.state.responses+1 : 5
       })
     
}
  playAgain =()=>{
   this.getQuestions();
    this.setState({
      score:0,
      responses:0
    })
  }
    componentDidMount(){
      this.getQuestions();
      }
  render() {
    return (
      <div className="container">
        <div className="title">Welcome to Quiz!<br></br><span style={{ fontSize:'49px', color: 'yellow' }}>Choose the Best Answer</span></div>
        {this.state.questionBank.length > 0 && this.state.responses<5 &&
        this.state.questionBank.map(({ question, answers, correct, questionId})=>
        <QuestionBox question={question} 
                     options={answers} 
                     selected={answer => this.computeAnswer(answer, correct)}
                     key={questionId}/>)}
         {this.state.responses ==5 ? <Result score={this.state.score} playAgain={this.playAgain}/> :null}            
      </div>
    )
  }
}


ReactDOM.render(
    <QuizApp />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
