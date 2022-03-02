const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { getDataById } = require("../common/Dynamo");

const tableName2 = process.env.tableName2;

exports.handler = async (event) => {
	if (!event.pathParameters || !event.pathParameters.id) {
		// failed without an id
		return sendResponse400({ message: "missing id from the path" });
	}

	let id = event.pathParameters.id;

	const venue = await getDataById(id, tableName2).catch((err) => {
		console.log("error in Dynamo Get", err);
		return null;
	});

	if (!venue) {
		return sendResponse400({ message: "Failed to get venue by id" });
	}

	return sendResponse200({ venue });
};
