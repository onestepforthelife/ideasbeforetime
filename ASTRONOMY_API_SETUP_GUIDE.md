# Astronomy Calculator - API Setup Guide

## Overview
This calculator uses 4 different calculation methods (GODA - Get One Data from All):
1. **Swiss Ephemeris** - Most accurate, free
2. **Drik Panchang** - Vedic calendar, free
3. **AstroAPI** - Vedic calculations, paid
4. **NASA Horizons** - Scientific precision, free

## API Integration Steps

### 1. Swiss Ephemeris (FREE)
**Website:** https://www.astro.com/swisseph/

**Setup:**
```javascript
// No API key needed - can use local library
// Install: npm install swisseph
const swisseph = require('swisseph');

// Calculate planetary positions
swisseph.swe_calc_ut(julianDay, planet, flags, (result) => {
    console.log(result);
});
```

**Pros:**
- Most accurate
- Free and open source
- Works offline
- Used by professional astrologers

**Cons:**
- Requires local installation
- More complex to use

---

### 2. Drik Panchang (FREE)
**Website:** https://www.drikpanchang.com/

**Setup:**
```javascript
// Web scraping or API (if available)
const url = `https://www.drikpanchang.com/planetary-positions.html?date=${date}&place=${place}`;

// Note: Drik Panchang doesn't have official API
// Options:
// 1. Web scraping (check their terms)
// 2. Contact them for API access
// 3. Use their website directly
```

**Pros:**
- Accurate Vedic calculations
- Free to use
- Popular in India

**Cons:**
- No official API
- May require web scraping

---

### 3. AstroAPI / Vedic Astro API (PAID)
**Website:** https://www.vedicastroapi.com/

**Setup:**
```javascript
// Get API key from: https://www.vedicastroapi.com/pricing
const API_KEY = 'your_api_key_here';
const USER_ID = 'your_user_id';

const response = await fetch('https://api.vedicastroapi.com/v3-json/horoscope/planet-details', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
        day: 9,
        month: 12,
        year: 2025,
        hour: 12,
        min: 0,
        lat: 28.6139,
        lon: 77.2090,
        tzone: 5.5
    })
});

const data = await response.json();
```

**Pricing:**
- Basic: $9/month (500 calls)
- Pro: $29/month (5000 calls)
- Enterprise: Custom

**Pros:**
- Professional Vedic calculations
- Includes nakshatras, dashas, yogas
- Good documentation
- Reliable API

**Cons:**
- Paid service
- Requires subscription

---

### 4. NASA Horizons (FREE)
**Website:** https://ssd.jpl.nasa.gov/horizons/

**Setup:**
```javascript
// NASA Horizons API
const params = new URLSearchParams({
    format: 'json',
    COMMAND: '10', // Sun
    START_TIME: '2025-12-09',
    STOP_TIME: '2025-12-09',
    STEP_SIZE: '1d',
    CENTER: 'coord@399',
    COORD_TYPE: 'GEODETIC',
    SITE_COORD: '77.2090,28.6139,0'
});

const response = await fetch(`https://ssd.jpl.nasa.gov/api/horizons.api?${params}`);
const data = await response.json();
```

**Planet Codes:**
- Sun: 10
- Moon: 301
- Mercury: 199
- Venus: 299
- Mars: 499
- Jupiter: 599
- Saturn: 699

**Pros:**
- Scientific accuracy
- Free
- Official NASA data
- No API key needed

**Cons:**
- Doesn't include Rahu/Ketu
- Western/scientific format
- Requires coordinate conversion

---

## Implementation Strategy

### Phase 1: Start with Free APIs
1. **Swiss Ephemeris** (local library)
2. **NASA Horizons** (free API)

### Phase 2: Add Vedic Sources
3. **Drik Panchang** (web scraping or manual)
4. **AstroAPI** (when budget allows)

---

## Sample Integration Code

```javascript
// astronomy-calculator.js
async function calculatePositions(date, time, place) {
    const results = {};
    
    // Method 1: Swiss Ephemeris (local)
    if (selectedMethods.includes('swiss')) {
        results.swiss = await calculateSwissEphemeris(date, time, place);
    }
    
    // Method 2: NASA Horizons (API)
    if (selectedMethods.includes('nasa')) {
        results.nasa = await calculateNASA(date, time, place);
    }
    
    // Method 3: AstroAPI (paid)
    if (selectedMethods.includes('astroapi') && hasAPIKey) {
        results.astroapi = await calculateAstroAPI(date, time, place);
    }
    
    // Method 4: Drik Panchang (manual/scraping)
    if (selectedMethods.includes('drik')) {
        results.drik = await calculateDrikPanchang(date, time, place);
    }
    
    return results;
}
```

---

## Geocoding (Place to Coordinates)

Use free geocoding API to convert place names to coordinates:

```javascript
// Option 1: OpenStreetMap Nominatim (FREE)
async function geocode(place) {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${place}&format=json`
    );
    const data = await response.json();
    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
    };
}

// Option 2: Google Geocoding API (paid but accurate)
// Option 3: Local database of Indian cities
```

---

## Testing Strategy

1. **Test with known dates:**
   - Today's date (verify with multiple sources)
   - Historical events (compare with published data)
   - Divine examples (Lord Rama, Krishna, etc.)

2. **Compare results:**
   - All 4 methods should give similar results
   - Differences should be < 1 degree
   - Document any discrepancies

3. **Validate accuracy:**
   - Cross-check with professional astrology software
   - Verify with published ephemeris tables
   - Test edge cases (eclipses, retrogrades)

---

## Cost Analysis

### Free Setup (Recommended to Start)
- Swiss Ephemeris: $0
- NASA Horizons: $0
- Geocoding (OSM): $0
- **Total: $0/month**

### Professional Setup
- Swiss Ephemeris: $0
- NASA Horizons: $0
- AstroAPI Basic: $9/month
- Google Geocoding: ~$5/month
- **Total: ~$14/month**

### Enterprise Setup
- All above
- AstroAPI Pro: $29/month
- Dedicated server: $20/month
- **Total: ~$54/month**

---

## Next Steps

1. ✅ HTML interface created
2. ✅ API integration structure ready
3. ⏳ Install Swiss Ephemeris library
4. ⏳ Test NASA Horizons API
5. ⏳ Add geocoding service
6. ⏳ Implement result comparison
7. ⏳ Add multi-language support
8. ⏳ Deploy and test

---

## Resources

- Swiss Ephemeris: https://www.astro.com/swisseph/
- NASA Horizons: https://ssd.jpl.nasa.gov/horizons/
- AstroAPI: https://www.vedicastroapi.com/
- Drik Panchang: https://www.drikpanchang.com/
- Nominatim Geocoding: https://nominatim.org/

---

## Support

For questions or issues:
1. Check API documentation
2. Test with sample data
3. Compare results across methods
4. Contact API providers if needed

---

**Created:** December 9, 2025  
**Last Updated:** December 9, 2025  
**Status:** Ready for implementation
