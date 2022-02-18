const { DynamoDB } = require("aws-sdk");
const {sendResponse200, sendResponse400} = require("../common/api_responses");
const { createDynamo } = require("../common/Dynamo")

const tableName = process.env.tableName

exports.handler = async (event) => {
	console.log("event", event);

	if (!event.pathParameters || !event.pathParameters.id) {
		// failed without an id
		return sendResponse400({ message: "missing id from the path" });
	}

	let id = event.pathParameters.id;

    const gig = JSON.parse(event.body)
    gig.id = id

    const newGig = await createDynamo(gig, tableName).catch(err => {
        console.log('error in dynamo write', err);
        return null
    })

    if (!newGig) {
        return sendResponse400({ message: "Failed to write user by id" });
    }

    return sendResponse200({ newGig });
}