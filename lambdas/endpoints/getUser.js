const {sendResponse200, sendResponse400} = require("../common/api_responses");

exports.handler = async (event) => {
	console.log("event", event);

	if (!event.pathParameters || !event.pathParameters.id) {
		// failed without an id
		return sendResponse400({ message: "missing id from the path" });
	}

	let id = event.pathParameters.id;

	if (data[id]) {
		// return data
		return sendResponse200(data[id]);
	}

	// failed as id not in the data
	return sendResponse400({ message: "no id in data" });
};

const data = {
	1234: { name: "Anna Jones", age: 25, job: "journalist" },
	1235: { name: "Chris Smith", age: 28, job: "builder" },
	1236: { name: "Bob Fossil", age: 87, job: "retired zoo keeper" },
};
