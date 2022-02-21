const { DynamoDB } = require("aws-sdk");
const {sendResponse200, sendResponse400} = require("../common/api_responses");
const {getAllGigData} = require("../common/Dynamo")

const tableName = process.env.tableName

exports.handler = async (event) => {
	console.log("event", event);

    const gig = await getAllGigData(tableName).catch(err => {
        console.log('error in Dynamo Get', err);
        return null
    })

    if (!gig) {
        return sendResponse400({ message: "Failed to get gig data" });
    }

    return sendResponse200({ gig });
}