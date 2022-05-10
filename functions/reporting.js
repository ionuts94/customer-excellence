const admin = require("firebase-admin");
const functions = require("firebase-functions");
const json2csv = require('json2csv').parse;
const moment = require("moment");
const _ = require('lodash');

admin.initializeApp();

exports.exportSurveyResults = functions
  .runWith({ timeoutSeconds: 540 })
  .https
  .onRequest(async (req, res) => {
    const now = Date.now();
    const fields = ['uid'];
    const formatedResults = [];
    const surveyType = req.query.surveyType;

    try {
      // Get survey fields and populate fields array
      const survey = await admin.firestore()
        .collection('surveysContent')
        .where('type', '==', surveyType)
        .get();
      const surveyJson = JSON.parse(survey.docs[0].data().json);
      surveyJson.pages.forEach(page => {
        page.elements.forEach(question => {
          if (question.type === 'rating') {
            fields.push(question.title);
          }
        })
      })

      // Get forManagers type surveys results 
      const results = await admin.firestore()
        .collection('surveys')
        .where('type', '==', surveyType)
        .get();

      for (let result of results.docs) {
        const resultData = result.data();
        const formatedResult = {
          uid: result.id
        }
        Object.entries(resultData.results).forEach(([_, value]) => {
          formatedResult[value.title] = value.answer;
        })
        formatedResults.push(formatedResult);
      }
    } catch (err) {
      throw new Error(`Failed to process '${surveyType}' type survey. Error: ${err.message}`);
    }

    const opts = { fields };
    const csv = json2csv(formatedResults, opts);
    res.setHeader(
      "Content-disposition",
      `attachment; filename=${surveyType}-data-${process.env.GCLOUD_PROJECT}-${moment(now).format("YYYYMMDDTHHmmss")}.csv`
    );
    res.set("Content-Type", "text/csv");
    res.status(200).send(csv);
  });