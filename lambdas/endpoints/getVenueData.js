const { DynamoDB } = require("aws-sdk");
const {sendResponse200, sendResponse400} = require("../common/api_responses");
const {getVenueById} = require("../common/Dynamo")

const tableName2 = process.env.tableName2

exports.handler = async (event) => {
	console.log("event", event);

	if (!event.pathParameters || !event.pathParameters.id) {
		// failed without an id
		return sendResponse400({ message: "missing id from the path" });
	}

	let id = event.pathParameters.id;

    const venue = await getVenueById(id, tableName2).catch(err => {
        console.log('error in Dynamo Get', err);
        return null
    })

    if (!venue) {
        return sendResponse400({ message: "Failed to get venue by id" });
    }

    return sendResponse200({ venue });
}