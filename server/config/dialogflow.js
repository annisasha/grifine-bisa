import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const sessionClient = new dialogflow.SessionsClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
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
