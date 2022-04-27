import React, { useState, useEffect } from 'react';
import { SurveyPage } from '../index';

const ReviewSurvey = ({ question }) => {
  const [pagesQuestions, setPagesQuestions] = useState();
  const [finalAnswers, setFinalAnswers] = useState();

  console.log(pagesQuestions);
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
    const pQuestions = [...pagesQuestions];
    if (questionIndex === 0) {
      const currentRating = pQuestions[pageIndex][questionIndex].currentAnswer;
      const currentPossition = getPossition(currentRating, 1, 6);
      const newPossition = getPossition(newRating, 1, 6);
      console.log(currentPossition);
      console.log(newPossition);

      // if (currentPossition !== newPossition) {
      //   pQuestions[pageIndex].forEach()
      // }
    }
    pQuestions[pageIndex][questionIndex].currentAnswer = newRating;
    setPagesQuestions(pQuestions);
  }

  const survey = question.data;
  const answers = survey.data;
  console.log(survey);

  useEffect(() => {
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
  }, [])

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