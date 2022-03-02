const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const AWS = require("aws-sdk");

const SNS = new AWS.SNS({ apiVersion: "2010-03-31" });

exports.handler = async (event) => {
	const body = JSON.parse(event.body);

	if (!body || !body.phoneNumber || !body.message) {
		return sendResponse400({
			message: "missing phone number or message from the body",
		});
	}

	const AttributeParams = {
		attributes: {
			DefaultSMSType: "Promotional",
		},
	};

	const messageParams = {
		Message: body.message,
		PhoneNumber: body.phoneNumber,
	};

	try {
		await SNS.setSMSAttributes(AttributeParams).promise();
		await SNS.publish(messageParams).promise();
		return sendResponse200({ message: "text has been sent" });
	} catch (error) {
		console.log("error", error);
		return sendResponse400({ message: "text failed to sent" });
	}
};
