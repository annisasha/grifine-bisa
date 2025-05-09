import dialogflow from '@google-cloud/dialogflow';
import dotenv from 'dotenv';

dotenv.config();

// Mengambil kredensial JSON dari environment variable
const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const sessionClient = new dialogflow.SessionsClient({
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, '\n'),  // Gantikan \n yang di-escape
  }
});

async function sendToDialogflow(sessionId, text) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.DIALOGFLOW_PROJECT_ID,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: 'id'
      }
    }
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  return result;
}

export { sendToDialogflow }; // Ekspor fungsi untuk digunakan di chatController.js
