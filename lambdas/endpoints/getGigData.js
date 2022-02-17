const { DynamoDB } = require("aws-sdk");
const {sendResponse200, sendResponse400} = require("../common/api_responses");
const {getDynamo} = require("../common/Dynamo")

const tableName = process.env.tableName

exports.handler = async (event) => {
	console.log("event", event);

	if (!event.pathParameters || !event.pathParameters.id) {
		// failed without an id
		return sendResponse400({ message: "missing id from the path" });
	}

	let id = event.pathParameters.id;

    const user = await getDynamo(id, tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null
    })

    if (!user) {
        return sendResponse400({ message: "Failed to get user by id" });
    }

    return sendResponse200(user);
}