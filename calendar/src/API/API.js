const host = process.env.REACT_APP_HOST;

async function getDisplayName(token) {
	let exists = await fetch(host, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"operationName": null,
			"variables": {},
			"query": `query {
				getUserInfos(token: "${token}") {
					name
				}
			}`
		})
	});
	exists = await exists.json()
	if (exists['error'])
		return "error";
	console.log(exists['data']['getUserInfos']['name'])
	return exists['data']['getUserInfos']['name'];
}

async function tokenValid(token) {
	let exists = await fetch(host, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"operationName": null,
			"variables": {},
			"query": `query {
				userExists(token: "${token}")
			}`
		})
	});
	exists = await exists.json()
	if (exists['error'])
		return false;
	return exists['data']['userExists'];
}


//add error manage
async function loginUserMicrosoft(name, email, microsoftID) {
	let exists = await fetch(host, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"operationName": null,
			"variables": {},
			"query": `query {
				userExists(email: "${email}")
			}`
		})
	});
	exists = await exists.json()
	if (exists['data']['userExists']) {
		let login = await fetch(host, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"operationName": null,
				"variables": {},
				"query": `query {
					login(email: "${email}", microsoftID: "${microsoftID}") {
						token
					}
				}`
			})
		});
		login = await login.json()
		return login['data']['login']['token']
	} else {
		let result = await fetch(host, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"operationName": null,
				"variables": {},
				"query": `mutation {
					createUser(name: "${name}", email: "${email}", microsoftID: "${microsoftID}") {
						token
					}
				}`
			})
		});
		result = await result.json()
		return result['data']['createUser']['token'];
	}
}

export { tokenValid, loginUserMicrosoft, getDisplayName };
