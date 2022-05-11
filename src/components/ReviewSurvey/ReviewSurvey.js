import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { SurveyPage } from '../index';
import './ReviewSurvey.scss';

const ReviewSurvey = ({ question }) => {
  const [pagesQuestions, setPagesQuestions] = useState();
  console.log(pagesQuestions);

  const getPath = (rate, minRate, maxRate) => {
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
    const { currentAnswer, rateMin, rateMax } = pQuestions[pageIndex][questionIndex];
    const currentPath = getPath(currentAnswer, rateMin, rateMax);
    const newPath = getPath(newRating, rateMin, rateMax);
    const newSurveyData = question.data.data;

    if (questionIndex === 0) {
      if (currentPath !== newPath) {
        for (let i = 1; i < pQuestions[pageIndex].length; i++) {
          if (pQuestions[pageIndex][i].path !== newPath) {
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
        const questions = page.questions.map((question) => {
          return {
            name: question.name,
            title: question.title,
            currentAnswer: answers[question.name],
            path: question.path,
            rateMin: question.rateMin,
            rateMax: question.rateMax
          }
        })
        pQuestions.push(questions);
      }
    })

    const newSurveyData = question.data.data;

    pQuestions.forEach((page, pageIndex) => {
      const mainQuestion = page[0];
      const mainQuestionPath = getPath(
        mainQuestion.currentAnswer,
        mainQuestion.rateMin,
        mainQuestion.rateMax
      );

      for (let i = 1; i < page.length; i++) {
        if (page[i].path !== mainQuestionPath) {
          pQuestions[pageIndex][i].currentAnswer = undefined;
          newSurveyData[pQuestions[pageIndex][i].name] = undefined;
        }
      }
    })

    question.data.data = newSurveyData;
    setPagesQuestions(pQuestions);
  }, [])

  return (
    <div className='review-survey-container'>
      {pagesQuestions &&
        pagesQuestions.map((page, index) => {
          const key = uuid();
          return (
            <SurveyPage
              key={key}
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