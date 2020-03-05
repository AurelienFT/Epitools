const host = process.env.REACT_APP_HOST;

export async function registerUserGoogle(name, email, googleID) {
    fetch(host, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			"operationName": null,
			"variables": {},
			"query": createQuery('mutation', {
					addPositionToJourney: {
							arguments: {
								journeyId: id,
								pointsId: pointId.data.createPoint.id
						}, fields: ["id"]
					}
			})
		})
    });
}