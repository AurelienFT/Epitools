const host = process.env.REACT_APP_HOST;

export async function loginUserMicrosoft(name, email, microsoftID) {
	console.log(host)
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
		console.log("exists")
		//add call to login to have the token
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
		return await result.json()
	}
}