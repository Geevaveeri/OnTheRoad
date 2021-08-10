const fetchCoordinates = async (address) => {
    const fetchCoord = await fetch(`https://trueway-geocoding.p.rapidapi.com/Geocode?address=${address}&language=en`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b38f645fa0msh490534a54dae3fbp1fc29bjsn703e822658db",
            "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com"
        }
    })

    return await fetchCoord.json();
}

const fetchOptRoute = async (coords) => {
    const fetchRoute = await fetch(`https://trueway-directions2.p.rapidapi.com/FindDrivingRoute?stops=${coords}&optimize=true`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b38f645fa0msh490534a54dae3fbp1fc29bjsn703e822658db",
            "x-rapidapi-host": "trueway-directions2.p.rapidapi.com"
        }
    })

    return await fetchRoute.json();
}

export const addressToCoords = async (address) => {
    const urlEncode = address.replace(/\ /g, '%20').replace(/,/g, '%2C')

    const coords = await fetchCoordinates(urlEncode);

    return coords.results[0];
}

export const getOptRoute = async (coords) => {
    const splitCoords = coords.map(coord => {
        return `${coord.lat}%2C${coord.lng}`
    })

    const urlEncode = splitCoords.join('%3B')

    const getRoute = await fetchOptRoute(urlEncode);

    const legs = getRoute.route.legs

    const stops = legs.map((leg) => {
        return `${leg.start_point.lat},${leg.start_point.lng}/`
    })

    stops.push(`${legs[legs.length - 1].end_point.lat},${legs[legs.length - 1].end_point.lng}`)

    const stopsOrdered = stops.join('')

    return (`www.google.com/maps/dir/${stopsOrdered}`)
}