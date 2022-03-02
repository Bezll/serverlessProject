const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { deleteCommentById } = require("../common/Dynamo");

const tableName3 = process.env.tableName3;

exports.handler = async (event) => {
	console.log("event", event);

	if (!event.pathParameters || !event.pathParameters.id) {
		// failed without an id
		return sendResponse400({ message: "missing id from the path" });
	}

	let id = event.pathParameters.id;

	const deleteComments = await deleteCommentById(id, tableName3).catch(
		(err) => {
			console.log("error in Dynamo Get", err);
			return null;
		}
	);

	return sendResponse200({});
};
