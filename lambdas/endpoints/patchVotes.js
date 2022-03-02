const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { updateData } = require("../common/Dynamo");

const tableName3 = process.env.tableName3;

exports.handler = async (event) => {
	if (!event.pathParameters || !event.pathParameters.id) {
		// failed without an id
		return sendResponse400({ message: "missing id from the path" });
	}

	let id = event.pathParameters.id;

	const { votes } = JSON.parse(event.body);

	const newVote = await updateData({
		tableName: tableName3,
		primaryKey: "id",
		primaryKeyValue: id,
		updateKey: "votes",
		updateValue: votes,
	});

	if (!Object.keys(newVote).length) {
		return sendResponse400({ message: "Failed to update comment by id" });
	}

	return sendResponse200({ newVote });
};
