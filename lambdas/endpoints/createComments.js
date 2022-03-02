const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { createDynamo } = require("../common/Dynamo");

const tableName3 = process.env.tableName3;

exports.handler = async (event) => {
	console.log("event", event);

	if (!event.pathParameters || !event.pathParameters.id) {
		// failed without an id
		return sendResponse400({ message: "missing id from the path" });
	}

	let id = event.pathParameters.id;

	const comment = JSON.parse(event.body);
	comment.id = id;

	const newComment = await createDynamo(comment, tableName3).catch((err) => {
		console.log("error in dynamo write", err);
		return null;
	});

	if (!newComment) {
		return sendResponse400({ message: "Failed to write comment by id" });
	}

	return sendResponse200({ newComment });
};
