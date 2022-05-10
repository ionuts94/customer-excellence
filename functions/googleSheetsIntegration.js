const { google } = require("googleapis");
const GSCredentials = require('GSCredentials.json');

const authorization = (credentials, callback) => {
  const { client_secret, client_id, redirect_uris } = GSCredentials;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);


}