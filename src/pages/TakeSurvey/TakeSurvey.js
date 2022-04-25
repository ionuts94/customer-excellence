import React, { useState, useEffect } from 'react';
import { SurveyComponent } from '../../components';
import { useParams } from 'react-router-dom';
import { loadSurvey } from '../../actions/surveys';

const TakeSurvey = () => {
  const { surveyId } = useParams();
  const [surveyJson, setSurveyJson] = useState();
  console.log(surveyJson);

  useEffect(() => {
    (async () => {
      const survey = await loadSurvey(surveyId);
      if (survey) {
        const surveyData = survey.data();
        setSurveyJson(
          JSON.parse(surveyData.json)
        );
      } else {
        console.log('Survey not found');
      }
    })();
    loadSurvey(surveyId);
  }, [])

  if (surveyJson) {
    return <SurveyComponent surveyJson={surveyJson} />
  } else {
    return <h1>Loading...</h1>
  }
}

export default TakeSurvey