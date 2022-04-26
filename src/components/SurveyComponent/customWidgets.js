import { CustomWidgetCollection } from 'survey-core'
import { ReviewSurvey } from '../index';

CustomWidgetCollection.Instance.addCustomWidget(
  {
    name: 'ReviewSurvey',
    title: 'ReviewSurvey',
    isFit: (question) => {
      return (
        question.getType() === 'html' &&
        question.html.indexOf('<ReviewSurvey') !== -1
      )
    },
    render: (question) => {
      return <ReviewSurvey question={question} />
    }
  }
)

// Survey.CustomWidgetCollection.Instance.addCustomWidget(
//   {
//     name: "Introduction",
//     title: "Introduction",
//     isFit: (question) => {
//       return (
//         question.getType() === "html" &&
//         question.html.indexOf("<Introduction") !== -1
//       );
//     },
//     render: (question) => {
//       return (
//         <JsxParser
//           autoCloseVoidElements
//           className="introduction"
//           components={{ Introduction }}
//           jsx={question.html}
//           onError={(e) => {
//               console.log(e);
//           }}
//         />
//       );
//     },
//   },
//   "customtype"
// );