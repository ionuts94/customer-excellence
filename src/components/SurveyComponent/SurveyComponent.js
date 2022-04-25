import React, { useState, useEffect } from 'react';

// Modern theme
import 'survey-core/modern.min.css';

import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

StylesManager.applyTheme("modern");

const SurveyComponent = ({ surveyJson }) => {
  const [surveyModel, setSurveyModel] = useState();

  useEffect(() => {
    const prepareModel = () => {
      const model = new Model(surveyJson)
      model.showPreviewBeforeComplete = 'showAnsweredQuestions';
      model.onCurrentPageChanged.add((survey) => {
        console.log(survey);
      })

      setSurveyModel(model);
    }

    prepareModel();
  }, [])

  if (!surveyModel) return '';
  return <Survey model={surveyModel} />
}

export default SurveyComponent