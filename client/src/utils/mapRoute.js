const addressToCoord = async (address) => {
    const fetchCoord = await fetch(`https://trueway-geocoding.p.rapidapi.com/Geocode?address=${param}&language=en`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b38f645fa0msh490534a54dae3fbp1fc29bjsn703e822658db",
            "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com"
        }
    })

    return await fetchCoord.json();
}

const getOptRoute = async (coords) => {
    const fetchRoute = await fetch(`https://trueway-directions2.p.rapidapi.com/FindDrivingRoute?stops=${param}&optimize=true`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b38f645fa0msh490534a54dae3fbp1fc29bjsn703e822658db",
            "x-rapidapi-host": "trueway-directions2.p.rapidapi.com"
        }
    })

    return await fetchRoute.json();
}