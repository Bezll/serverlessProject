const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.getAllData = async (TableName) => {
	let ScanningParams = {
		TableName,
		Limit: 100,
	};

	const data = await documentClient.scan(ScanningParams).promise();

	if (!data) {
		throw Error(`There was an error fetching the data from ${TableName}`);
	}

	return data;
};

module.exports.getDataById = async (id, TableName) => {
	const params = {
		TableName,
		Key: {
			id,
		},
	};

	const data = await documentClient.get(params).promise();

	if (!data || !data.Item) {
		throw Error(
			`There was an error fetching the data for id of ${id} from ${TableName}`
		);
	}
	console.log(data);

	return data.Item;
};

module.exports.postData = async (data, TableName) => {
	if (!data.id) {
		throw Error(`no id on the data`);
	}

	const params = {
		TableName,
		Item: data,
	};

	const res = await documentClient.put(params).promise();

	if (!res) {
		throw Error(
			`There was an error inserting id of ${data.id} in table ${TableName}`
		);
	}

	return data;
};

module.exports.updateData = async ({
	tableName,
	primaryKey,
	primaryKeyValue,
	updateKey,
	updateValue,
}) => {
	const params = {
		TableName: tableName,
		Key: { [primaryKey]: primaryKeyValue },
		UpdateExpression: `set ${updateKey} = :updateValue`,
		ExpressionAttributeValues: {
			":updateValue": updateValue,
		},
		ReturnValues: "UPDATED_NEW",
	};

	const data = await documentClient.update(params).promise();

	return data;
};

module.exports.queryData = async ({
	tableName,
	index,
	queryKey,
	queryValue,
}) => {
	const params = {
		TableName: tableName,
		IndexName: index,
		KeyConditionExpression: `${queryKey} = :hkey`,
		ExpressionAttributeValues: {
			":hkey": queryValue,
		},
	};
	const data = await documentClient.query(params).promise();

	return data.Items || [];
};

module.exports.deleteData = async (id, TableName) => {
	const params = {
		TableName,
		Key: {
			id,
		},
	};

	const data = await documentClient.delete(params).promise();

	return data;
};
