const AWS = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");

const SES = new AWS.SES();

exports.handler = async (event) => {
	const { to, from, subject, text } = JSON.parse(event.body);

	if (!to || !from || !subject || !text) {
		return sendResponse400({
			message: "to, from, subject and text are all required in the body",
		});
	}

	const params = {
		Destination: {
			ToAddresses: [to],
		},
		Message: {
			Body: {
				Text: { Data: text },
			},
			Subject: { Data: subject },
		},
		Source: from,
	};

	try {
		await SES.sendEmail(params).promise();
		return sendResponse200({});
	} catch (error) {
		console.log("error sending email ", error);
		return sendResponse400({ message: "The email failed to send" });
	}
};
