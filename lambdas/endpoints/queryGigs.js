const { DynamoDB } = require("aws-sdk");
const { sendResponse200, sendResponse400 } = require("../common/api_responses");
const { queryGigData } = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
	console.log("event", event);

	if (!event.pathParameters.venue_id) {
		// failed without an venue id
		return sendResponse400({ message: "missing venue id from the path" });
	}

	const venue_id = event.pathParameters.venue_id;

	const queryTheGigs = await queryGigData({
		tableName,
		index: "venue_id-index",
		queryKey: "venue_id",
		queryValue: venue_id,
	});

	return sendResponse200(queryTheGigs);
};
