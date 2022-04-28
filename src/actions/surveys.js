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
    const surveyRef = doc(db, 'surveys', currentSurveyId);
    updateDoc(surveyRef, {
      results: survey.data
    });
  }
}