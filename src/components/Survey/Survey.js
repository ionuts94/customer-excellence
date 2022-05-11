import React from "react";
import { v4 as uuid } from 'uuid';
import './Survey.scss';

export const SurveyPage = ({ page, pageIndex, updateSurveyState }) => {
  return (
    <div className='survey-page-container'>
      <h1>Page: {pageIndex + 1}</h1>
      <div className='page-questions-container'>
        <div className='main-question-container'>
          <SurveyQuestion
            question={page[0]}
            questionIndex={0}
            isMainQuestion={true}
            maxRate={6}
            pageIndex={pageIndex}
            updateSurveyState={updateSurveyState}
          />
        </div>
        <div className='subquestions-container'>
          {
            page.map((question, index) => {
              const key = uuid();
              if (index === 0) {
                return null;
              }
              if (question.currentAnswer > -1) {
                return <SurveyQuestion
                  key={key}
                  question={question}
                  questionIndex={index}
                  maxRate={6}
                  pageIndex={pageIndex}
                  updateSurveyState={updateSurveyState}
                />
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

export const SurveyQuestion = ({ question, pageIndex, questionIndex, isMainQuestion, maxRate, updateSurveyState }) => {
  const rateArray = [];
  for (let i = 1; i <= maxRate; i++) {
    rateArray.push(i);
  }

  return (
    <div className='question-container'>
      <h2 className={`question-title ${!isMainQuestion ? 'smaller75' : ''}`}>
        {question.title}
      </h2>

      <div className={`${isMainQuestion ? 'main-rates-container' : 'sub-rates-container'}`}>
        {
          rateArray.map(rating => {
            const key = uuid()
            if (rating === question.currentAnswer) {
              return <RatePick
                key={key}
                selected={true}
                number={rating}
                pageIndex={pageIndex}
                questionIndex={questionIndex}
                updateSurveyState={updateSurveyState}
              />
            }
            return <RatePick
              key={key}
              number={rating}
              pageIndex={pageIndex}
              questionIndex={questionIndex}
              updateSurveyState={updateSurveyState}
            />
          })
        }
      </div>
    </div>
  );
}

const RatePick = ({ number, selected, pageIndex, questionIndex, updateSurveyState }) => {
  return (
    <span
      className={`rate ${selected ? 'selected' : ''}`}
      onClick={() => updateSurveyState(pageIndex, questionIndex, number)}
    >
      {number}
    </span>
  )
}
