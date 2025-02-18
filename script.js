const dailyDeals = {
  0: [ // Sunday
        // RIDGELAND 
      { name: "Open Mind", deal: "&#127968 15% off store-wide", lat: 32.38819, lon:-90.11402 },
  ],
  1: [ // Monday
        // RIDGELAND
      { name: "Open Mind", deal: "&#127851 20% off edibles", lat: 32.38819, lon:-90.11402 },
  ],
  2: [ // Tuesday
    // RIDGELAND
      { name: "Open Mind", deal: "", lat: 32.38819, lon:-90.11402 },
  ],
  3: [ // Wednesday
    // RIDGELAND
      { name: "Open Mind", deal: "", lat: 32.38819, lon:-90.11402 },
  ],
  4: [ // Thursday
    // RIDGELAND
      { name: "Open Mind", deal: "", lat: 32.38819, lon:-90.11402 },
  ],
  5: [ // Friday
    // RIDGELAND
      { name: "Open Mind", deal: "", lat: 32.38819, lon:-90.11402 },
  ],
  6: [ // Saturday
    // RIDGELAND
      { name: "Open Mind", deal: "", lat: 32.38819, lon:-90.11402 },
  ]  
  
  
  // template { name: "", deal: "", lat: 0, lon: 0 },
  // house: &#127968 flower: &#127804 honeypot: &#127855 chocolate bar: &#127851 topical : &#129524 tincture : &#128167 
  // pre-roll: &#128684
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date().getDay(); 

const todayDeals = dailyDeals[today];

document.getElementById('currentDay').textContent = `Deals for ${dayNames[today]}`;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(locateSuccess, locateError);
} else {
  console.error("Geolocation is not supported by your browser.");
}

function locateSuccess(position) {
  const userLat = position.coords.latitude;
  const userLng = position.coords.longitude;
  todayDeals.sort((a, b) => {
    const distanceA = haversineDistance(userLat, userLng, a.lat, a.lon);
    const distanceB = haversineDistance(userLat, userLng, b.lat, b.lon);
    return distanceA - distanceB; // Sort ascending (closest first)
  });
  
  let html = '<ul>';
  
  todayDeals.forEach(function(deal) {
    // Optionally calculate the distance to display with each deal
    const distance = haversineDistance(userLat, userLng, deal.lat, deal.lon);
    html += `<li>${deal.deal}, ${deal.name} - ${distance.toFixed(1)} mi</li>`;
  });
  html += '</ul>';
  // Inject the HTML into the element on your page
  document.getElementById('dealsList').innerHTML = html;
  
}
function locateError(error) {
console.log("Error");
}
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of the Earth in kilometers. Use 3958.8 for miles.
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


