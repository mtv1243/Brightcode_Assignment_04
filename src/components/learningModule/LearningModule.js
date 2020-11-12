import React from 'react';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import ProgressBar from '../progressBar/ProgressBar';
import Modal from '../modal/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Styles.scss';

const LearningModule = ({setGameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [loadingActive, setLoadingActive] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId]: {};
  React.useEffect(()=>{
    getQuizData();
  },[]);

  const getQuizData=()=>{
    fetch("http://localhost:8080/problems")
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setQuizData(data);
      }).catch((err)=>{
        console.log(err);
      });
  }

  const handleSubmit=()=> {
    if(currentQuestionId < quizData.totalQuestions-1){
      setLoadingActive(true);
      setTimeout(()=>{setLoadingActive(false)}, 500)
      setCurrentQuestionId(currentQuestionId+1);
    } else {
      setCurrentQuestionId(0);
      setGameStatus({message: "Great Job! Play again.", loadIntro: true});
    }
  }
  let possibleAnswers = [];
  if(currentQuestion.possibleAnswers){
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox id={index} key={index} answer={answer} />
    })
  }


  return (
    <div className="learningModule">
      { currentQuestion.title &&
        <>
          <ProgressBar totalQuestions={ quizData.totalQuestions } id={ currentQuestion.id } />
          <div className="learningModule--header">
            <div className="learningModule--title">
              { currentQuestion.title }
              <FontAwesomeIcon className="learningModule--title--icon" icon={ faInfoCircle } onClick={ (e)=>{setShowModal(true)} } />
            </div>
            <div className="learningModule--subHeader">
              { currentQuestion.additionalInfo }
            </div>
            { showModal &&
              <Modal setShowModal={ setShowModal } modalMessage={ currentQuestion.additionalInfo } />
            }
          </div>

          <div className="learningModule--answerArea">
            <div className="learningModule--selections">
              { possibleAnswers }
            </div>
            <div className="learningModule--submitButtonContainer">
              <Button label="Submit" handleSubmit={ handleSubmit } loadingActive={ loadingActive } />
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default LearningModule;
