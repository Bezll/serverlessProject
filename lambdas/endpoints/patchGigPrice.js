const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { updateData } = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
	if (!event.pathParameters || !event.pathParameters.id) {
		// failed without an id
		return sendResponse400({ message: "missing id from the path" });
	}

	let id = event.pathParameters.id;

	const { price } = JSON.parse(event.body);

	const newGig = await updateData({
		tableName,
		primaryKey: "id",
		primaryKeyValue: id,
		updateKey: "price",
		updateValue: price,
	});

	if (!Object.keys(newGig).length) {
		return sendResponse400({ message: "Failed to update user by id" });
	}

	return sendResponse200({ newGig });
};
