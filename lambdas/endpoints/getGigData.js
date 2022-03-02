const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { getDataById } = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
	if (!event.pathParameters || !event.pathParameters.id) {
		// failed without an id
		return sendResponse400({ message: "missing id from the path" });
	}

	let id = event.pathParameters.id;

	const gig = await getDataById(id, tableName).catch((err) => {
		console.log("error in Dynamo Get", err);
		return null;
	});

	if (!gig) {
		return sendResponse400({ message: "Failed to get gig by id" });
	}

	return sendResponse200({ gig });
};
