import { db } from './init';
import { doc, getDoc } from "firebase/firestore";

export const loadSurvey = async (surveyId) => {
  const surveyRef = doc(db, 'surveys', surveyId);
  const surveySnap = await getDoc(surveyRef);

  if (surveySnap.exists()) {
    return surveySnap;
  } else {
    return null;
  }
}