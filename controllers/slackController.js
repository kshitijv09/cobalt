const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const SLACK_URL = process.env.SLACK_URL;


exports.sendData = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const slackMessage = {
      text: `New message from ${name} (${email}): ${message}`
    };

    await axios.post(SLACK_URL, JSON.stringify(slackMessage), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send({ message: 'Form data sent to Slack successfully' });
  } catch (error) {
    console.error('Error sending form data to Slack:', error);
    res.status(500).send({ error: 'Failed to send form data to Slack' });
  }
};