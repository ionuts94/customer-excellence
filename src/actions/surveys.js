import { db } from './init';
import { doc, getDoc, updateDoc } from "firebase/firestore";

let currentSurveyId = '';

export const loadSurvey = async (surveyId) => {
  currentSurveyId = surveyId;
  const surveyRef = doc(db, 'surveys', surveyId);
  const surveySnap = await getDoc(surveyRef);

  if (surveySnap.exists()) {
    return surveySnap;
  } else {
    return null;
  }
}

export const uploadResultsToFirebase = (survey) => {
  if (currentSurveyId) {
    // Add questions titles to survey data 
    const newSurveyData = {};
    Object.entries(survey.data).forEach(entry => {
      const [questionName, questionAnswer] = entry;
      let questionTitle;
      for (let page of survey.pages) {
        const { title } = page.elements.find(question => question.name === questionName) || {};
        if (title) {
          questionTitle = title; 
          break;
        }
      }
      newSurveyData[questionName] = {
        answer: questionAnswer,
        title: questionTitle
      }
    })

    const surveyRef = doc(db, 'surveys', currentSurveyId);
    updateDoc(surveyRef, {
      results: newSurveyData
    });
  }
}