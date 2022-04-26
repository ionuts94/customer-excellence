import React, { useState, useEffect } from 'react'

const ReviewSurvey = ({ question }) => {
  const [pagesQuestions, setPagesQuestions] = useState();


  const survey = question.data;
  const answers = survey.data;

  useEffect(() => {
    const pQuestions = survey.pages.map(page => {
      const questions = page.questions.map(question => {
        return {
          name: question.name,
          title: question.title,
          currentAnswer: answers[question.name]
        }
      })
  
      return questions.map(question => question);
    })
    setPagesQuestions(pQuestions);
  }, [])

  console.log(pagesQuestions);

  return (
    <div>
      {pagesQuestions &&
        pagesQuestions.map((page, index) => {
          return <ReviewSurvey.Page index={index} >
            {
              page.map((question, index) => {
                return <ReviewSurvey.Question />
              })
            }
          </ReviewSurvey.Page>
        })
      }
    </div>
  )
}

ReviewSurvey.Page = ({ children, pageIndex }) => {

  return (
    <div>
      <h1>Page: {pageIndex + 1}</h1>
    </div>
  )
}

ReviewSurvey.Question = ({question, questionIndex}) => {
  return null;
}

export default ReviewSurvey