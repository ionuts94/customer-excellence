import React, { useState, useEffect } from 'react';
import { SurveyPage } from '../index';

const ReviewSurvey = ({ question, updateQuestionPick }) => {
  const [pagesQuestions, setPagesQuestions] = useState();
  const [finalAnswers, setFinalAnswers] = useState();

  console.log(pagesQuestions);
  console.log(question.data.data);
  const getPossition = (rate, minRate, maxRate) => {
    const mid = maxRate / 2;
    if (minRate <= rate && rate <= mid) {
      return 'left';
    } else if (mid + 1 <= rate && rate <= maxRate) {
      return 'right';
    } else {
      return 'unknown possition';
    }
  }

  const updateSurveyState = (pageIndex, questionIndex, newRating) => {
    console.log(question.data.data);
    const pQuestions = [...pagesQuestions];
    const currentRating = pQuestions[pageIndex][questionIndex].currentAnswer;
    const currentPossition = getPossition(currentRating, 1, 6);
    const newPossition = getPossition(newRating, 1, 6);
    const newSurveyData = question.data.data;
    
    if (questionIndex === 0) {
      if (currentPossition !== newPossition) {
        for (let i = 1; i < pQuestions[pageIndex].length; i++) {
          if (pQuestions[pageIndex][i].path !== newPossition) {
            pQuestions[pageIndex][i].currentAnswer = undefined;
            newSurveyData[pQuestions[pageIndex][i].name] = undefined;
          } else {
            pQuestions[pageIndex][i].currentAnswer = 0;
            newSurveyData[pQuestions[pageIndex][i].name] = undefined;
          }
        }
      }
    }
    
    newSurveyData[pQuestions[pageIndex][questionIndex].name] = newRating;
    question.data.data = newSurveyData;
    pQuestions[pageIndex][questionIndex].currentAnswer = newRating;
    setPagesQuestions(pQuestions);
  }

  useEffect(() => {
    const survey = question.data;
    const answers = survey.data;
    const pQuestions = [];
    survey.pages.forEach((page, index) => {
      if (index < survey.pages.length - 1) {
        const questions = page.questions.map((question, index) => {
          return {
            name: question.name,
            title: question.title,
            currentAnswer: answers[question.name],
            path: question.path
          }
        })
        pQuestions.push(questions);
      }
    })
    setPagesQuestions(pQuestions);
  }, [question])

  return (
    <div>
      {pagesQuestions &&
        pagesQuestions.map((page, index) => {
          return (
            <SurveyPage 
              page={page} 
              pageIndex={index} 
              updateSurveyState={updateSurveyState}
            />
          )
        })
      }
    </div>
  )
}

export default ReviewSurvey