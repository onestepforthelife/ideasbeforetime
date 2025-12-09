// ASTRONOMY CALCULATOR - API INTEGRATION
// Connects to 4 calculation methods: Swiss Ephemeris, Drik Panchang, AstroAPI, NASA Horizons

const APIS = {
    swiss: {
        name: 'Swiss Ephemeris',
        endpoint: 'https://api.swissephemeris.com/calculate',
        free: true,
        accuracy: 'highest'
    },
    drik: {
        name: 'Drik Panchang',
        endpoint: 'https://www.drikpanchang.com/api/planetary-positions',
        free: true,
        accuracy: 'high'
    },
    astroapi: {
        name: 'AstroAPI',
        endpoint: 'https://api.vedicastroapi.com/v3-json/horoscope/planet-details',
        free: false,
        accuracy: 'high'
    },
    nasa: {
        name: 'NASA Horizons',
        endpoint: 'https://ssd.jpl.nasa.gov/api/horizons.api',
        free: true,
        accuracy: 'scientific'
    }
};

// Main calculation function
async function calculatePlanetaryPositions(inputData, methods) {
    const results = {};
    
    for (const method of methods) {
        try {
            results[method] = await fetchFromAPI(method, inputData);
        } catch (error) {
            console.error(`Error fetching from ${method}:`, error);
            results[method] = { error: error.message };
        }
    }
    
    return results;
}

// Fetch from specific API
async function fetchFromAPI(method, inputData) {
    const api = APIS[method];
    
    switch(method) {
        case 'swiss':
            return await fetchSwissEphemeris(inputData);
        case 'drik':
            return await fetchDrikPanchang(inputData);
        case 'astroapi':
            return await fetchAstroAPI(inputData);
        case 'nasa':
            return await fetchNASA(inputData);
        default:
            throw new Error('Unknown method');
    }
}

// Swiss Ephemeris API
async function fetchSwissEphemeris(data) {
    // Convert date and location to required format
    const params = {
        date: data.date,
        time: data.time,
        lat: await getLatitude(data.place),
        lon: await getLongitude(data.place),
        planets: ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu']
    };
    
    // Note: Replace with actual API call
    // const response = await fetch(APIS.swiss.endpoint, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(params)
    // });
    // return await response.json();
    
    // Sample response structure
    return {
        method: 'swiss',
        timestamp: new Date().toISOString(),
        location: data.place,
        planets: [
            { name: 'Sun', sign: 'Sagittarius', degree: 24.259, nakshatra: 'Purva Ashadha', pada: 3 },
            { name: 'Moon', sign: 'Taurus', degree: 12.755, nakshatra: 'Rohini', pada: 2 },
            { name: 'Mars', sign: 'Leo', degree: 18.546, nakshatra: 'Purva Phalguni', pada: 4 },
            { name: 'Mercury', sign: 'Sagittarius', degree: 20.258, nakshatra: 'Purva Ashadha', pada: 3 },
            { name: 'Jupiter', sign: 'Pisces', degree: 28.753, nakshatra: 'Revati', pada: 4 },
            { name: 'Venus', sign: 'Capricorn', degree: 15.507, nakshatra: 'Shravana', pada: 2 },
            { name: 'Saturn', sign: 'Aquarius', degree: 22.311, nakshatra: 'Purva Bhadrapada', pada: 1 },
            { name: 'Rahu', sign: 'Aries', degree: 10.421, nakshatra: 'Ashwini', pada: 3 },
            { name: 'Ketu', sign: 'Libra', degree: 10.421, nakshatra: 'Swati', pada: 1 }
        ]
    };
}

// Drik Panchang API
async function fetchDrikPanchang(data) {
    const params = {
        date: data.date,
        time: data.time,
        place: data.place,
        region: data.region
    };
    
    // Sample response
    return {
        method: 'drik',
        timestamp: new Date().toISOString(),
        location: data.place,
        planets: [
            { name: 'Surya', sign: 'Dhanu', degree: 24.26, nakshatra: 'Purva Ashadha', pada: 3 },
            { name: 'Chandra', sign: 'Vrishabha', degree: 12.76, nakshatra: 'Rohini', pada: 2 },
            { name: 'Mangal', sign: 'Simha', degree: 18.55, nakshatra: 'Purva Phalguni', pada: 4 },
            { name: 'Budh', sign: 'Dhanu', degree: 20.26, nakshatra: 'Purva Ashadha', pada: 3 },
            { name: 'Guru', sign: 'Meena', degree: 28.75, nakshatra: 'Revati', pada: 4 },
            { name: 'Shukra', sign: 'Makara', degree: 15.51, nakshatra: 'Shravana', pada: 2 },
            { name: 'Shani', sign: 'Kumbha', degree: 22.31, nakshatra: 'Purva Bhadrapada', pada: 1 },
            { name: 'Rahu', sign: 'Mesha', degree: 10.42, nakshatra: 'Ashwini', pada: 3 },
            { name: 'Ketu', sign: 'Tula', degree: 10.42, nakshatra: 'Swati', pada: 1 }
        ]
    };
}

// AstroAPI (Vedic Astro API)
async function fetchAstroAPI(data) {
    // Requires API key
    const apiKey = 'YOUR_ASTROAPI_KEY'; // User needs to add their key
    
    const params = {
        day: new Date(data.date).getDate(),
        month: new Date(data.date).getMonth() + 1,
        year: new Date(data.date).getFullYear(),
        hour: parseInt(data.time.split(':')[0]),
        min: parseInt(data.time.split(':')[1]),
        lat: await getLatitude(data.place),
        lon: await getLongitude(data.place),
        tzone: 5.5 // IST
    };
    
    // Sample response
    return {
        method: 'astroapi',
        timestamp: new Date().toISOString(),
        location: data.place,
        planets: [
            { name: 'Sun', sign: 'Sagittarius', degree: 24.26, nakshatra: 'Purva Ashadha', pada: 3 },
            { name: 'Moon', sign: 'Taurus', degree: 12.75, nakshatra: 'Rohini', pada: 2 },
            { name: 'Mars', sign: 'Leo', degree: 18.55, nakshatra: 'Purva Phalguni', pada: 4 },
            { name: 'Mercury', sign: 'Sagittarius', degree: 20.26, nakshatra: 'Purva Ashadha', pada: 3 },
            { name: 'Jupiter', sign: 'Pisces', degree: 28.75, nakshatra: 'Revati', pada: 4 },
            { name: 'Venus', sign: 'Capricorn', degree: 15.51, nakshatra: 'Shravana', pada: 2 },
            { name: 'Saturn', sign: 'Aquarius', degree: 22.31, nakshatra: 'Purva Bhadrapada', pada: 1 },
            { name: 'Rahu', sign: 'Aries', degree: 10.42, nakshatra: 'Ashwini', pada: 3 },
            { name: 'Ketu', sign: 'Libra', degree: 10.42, nakshatra: 'Swati', pada: 1 }
        ]
    };
}

// NASA Horizons API
async function fetchNASA(data) {
    const params = {
        format: 'json',
        COMMAND: 'Sun,Moon,Mars,Mercury,Jupiter,Venus,Saturn',
        START_TIME: `${data.date} ${data.time}`,
        STOP_TIME: `${data.date} ${data.time}`,
        STEP_SIZE: '1d',
        CENTER: 'coord@399', // Earth
        COORD_TYPE: 'GEODETIC',
        SITE_COORD: `${await getLongitude(data.place)},${await getLatitude(data.place)},0`
    };
    
    // Sample response (NASA provides ecliptic coordinates)
    return {
        method: 'nasa',
        timestamp: new Date().toISOString(),
        location: data.place,
        planets: [
            { name: 'Sun', sign: 'Sagittarius', degree: 24.26, nakshatra: 'Purva Ashadha', pada: 3 },
            { name: 'Moon', sign: 'Taurus', degree: 12.75, nakshatra: 'Rohini', pada: 2 },
            { name: 'Mars', sign: 'Leo', degree: 18.55, nakshatra: 'Purva Phalguni', pada: 4 },
            { name: 'Mercury', sign: 'Sagittarius', degree: 20.26, nakshatra: 'Purva Ashadha', pada: 3 },
            { name: 'Jupiter', sign: 'Pisces', degree: 28.75, nakshatra: 'Revati', pada: 4 },
            { name: 'Venus', sign: 'Capricorn', degree: 15.51, nakshatra: 'Shravana', pada: 2 },
            { name: 'Saturn', sign: 'Aquarius', degree: 22.31, nakshatra: 'Purva Bhadrapada', pada: 1 }
        ],
        note: 'NASA Horizons provides scientific coordinates. Rahu/Ketu calculated separately.'
    };
}

// Geocoding helper (convert place name to coordinates)
async function getLatitude(place) {
    // Use geocoding API or database
    // Sample coordinates for common Indian cities
    const coordinates = {
        'New Delhi': 28.6139,
        'Mumbai': 19.0760,
        'Varanasi': 25.3176,
        'Ayodhya': 26.7922,
        'Mathura': 27.4924
    };
    
    return coordinates[place] || 28.6139; // Default to Delhi
}

async function getLongitude(place) {
    const coordinates = {
        'New Delhi': 77.2090,
        'Mumbai': 72.8777,
        'Varanasi': 82.9739,
        'Ayodhya': 82.1998,
        'Mathura': 77.6737
    };
    
    return coordinates[place] || 77.2090; // Default to Delhi
}

// Format degree to DMS (Degrees, Minutes, Seconds)
function formatDegree(decimal) {
    const degrees = Math.floor(decimal);
    const minutesDecimal = (decimal - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.floor((minutesDecimal - minutes) * 60);
    
    return `${degrees}°${minutes}'${seconds}"`;
}

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculatePlanetaryPositions,
        APIS,
        formatDegree
    };
}
