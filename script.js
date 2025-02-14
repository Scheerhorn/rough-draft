const dailyDeals = {
    0: [ // Sunday
        { name: "Cafe Sunday", lat: 40.7128, lon: -74.0060 },
        { name: "Bookstore Haven", lat: 40.7306, lon: -73.9352 }
    ],
    1: [ // Monday
        { name: "Tech Hub", lat: 34.0522, lon: -118.2437 },
        { name: "Downtown Deli", lat: 65.0407, lon: -46.2468 }
    ],
    2: [ // Tuesday
        { name: "Tech Hub", lat: 32.38431533522139, lon:-90.04181296061851},
        { name: "Rock Climbing Gym", lat: 32.33835, lon: -90.14570}
    ],
    3: [ // Wednesday
        { name: "Cozy Library", lat: 37.7749, lon: -122.4194 },
        { name: "Art Museum", lat: 37.8001, lon: -122.4177 }
    ],
    4: [ // Thursday
        { name: "Music Store", lat: 47.6062, lon: -122.3321 },
        { name: "Cinema Paradise", lat: 47.6152, lon: -122.3415 }
    ],
    5: [ // Friday
        { name: "Local Bakery", lat: 29.7604, lon: -95.3698 },
        { name: "Farmers Market", lat: 29.7523, lon: -95.3624 }
    ],
    6: [ // Saturday
        { name: "Gaming Lounge", lat: 33.4484, lon: -112.0740 },
        { name: "Outdoor Park", lat: 33.4555, lon: -112.0651 }
    ]
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
    html += `<li>${deal.name} - ${distance.toFixed(1)} mi away</li>`;
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

