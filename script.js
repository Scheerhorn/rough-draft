const dailyDeals = {
  0: [ // Sunday
        //CENTRAL
          // RIDGELAND 
            { name: "Open Mind", deal: "&#127968 15% off store-wide", lat: 32.38819, lon:-90.11402},
            // Rootdown - Old Canton is closed on Sunday
            // Ignite need to check on Sunday 
            // Southern Sky - Lakeland is closed on Sunday
            // Rootdown - Lakeland is closed on Sunday
          //PEARL
            { name: "", deal: "", lat: 0, lon: 0},
            
            
  ],
  1: [ // Monday
        // RIDGELAND
          { name: "Open Mind", deal: "&#127851 20% off Edibles", lat: 32.38819, lon:-90.11402},
          { name: "Rootdown - Old Canton", deal: "&#127804 20% off select micros Flower", lat: 32.36077, lon: -90.14643},
          { name: "Ignite", deal: "&#127851 20% off Edibles", lat: 32.3766, lon: -90.1472},
          { name: "Southern Sky - Lakeland", deal: "&#127851 20% off Edibles", lat: 32.3329, lon: -90.1386},
          { name: "Rootdown - Lakeland", deal: "&#127804 20% off select micros Flower", lat: 32.33369, lon: -90.1446},
          { name: "", deal: "", lat: 0, lon: 0},
  ],
  2: [ // Tuesday
        // RIDGELAND
          { name: "Open Mind", deal: "&#128684 20% off Pre-rolls", lat: 32.38819, lon:-90.11402},
          { name: "Rootdown - Old Canton", deal: "&#127851 Buy 2 get 1 100mg Gummies", lat: 32.36077, lon: -90.14643},
          { name: "Ignite", deal: "&#128167 20% off all Tincture", lat: 32.3766, lon: -90.1472},
          { name: "Southern Sky - Lakeland", deal: "&#9889 20% off Vapes", lat: 32.3329, lon: -90.1386},
          { name: "Rootdown - Lakeland", deal: "&#127851 Buy 2 get 1 100mg Gummies", lat: 32.33369, lon: -90.1446},
          { name: "", deal: "&#129689", lat: 0, lon: 0},
  ],
  3: [ // Wednesday
        // RIDGELAND
          { name: "Open Mind", deal: "&#9889 &#127855 20% off Vapes & Concentrates", lat: 32.38819, lon:-90.11402},
          { name: "Rootdown - Old Canton", deal: "&#127855 BOGO 30% off Concentrates", lat: 32.36077, lon: -90.14643},
          { name: "Ignite", deal: "&#127968 20% off budtender's choice", lat: 32.3766, lon: -90.1472},
          { name: "Southern Sky - Lakeland", deal: "&#129524 &#128167 20% off Topicals & Tinctures", lat: 32.3329, lon: -90.1386},
          { name: "Rootdown - Lakeland", deal: "&#127855 BOGO 30% off Concentrates", lat: 32.33369, lon: -90.1446},
          { name: "", deal: "", lat: 0, lon: 0},
  ],
  4: [ // Thursday
        // RIDGELAND
          { name: "Open Mind", deal: "&#129524 20% off Topicals", lat: 32.38819, lon:-90.11402},
          { name: "Rootdown - Old Canton", deal: "&#127865 Buy 3 get 1 Noble Seltzer", lat: 32.36077, lon: -90.14643},
          { name: "Ignite", deal: "&#127865 BOGO 1/2 off Seltzer", lat: 32.3766, lon: -90.1472},
          { name: "Southern Sky - Lakeland", deal: "&#128684 20% off Pre-rolls", lat: 32.3329, lon: -90.1386},
          { name: "Rootdown - Lakeland", deal: "&#127865 Buy 3 get 1 Noble Seltzer", lat: 32.33369, lon: -90.1446},
          { name: "", deal: "", lat: 0, lon: 0},
  ],
  5: [ // Friday
        // RIDGELAND
          { name: "Open Mind", deal: "&#127804 $10 off each Flower item", lat: 32.38819, lon:-90.11402},
          { name: "Rootdown - Old Canton", deal: "&#127968 House Deal", lat: 32.36077, lon: -90.14643},
          { name: "Ignite", deal: "&#127804 20% off all Flower", lat: 32.3766, lon: -90.1472},
          { name: "Southern Sky - Lakeland", deal: "&#127804 20% off Flower", lat: 32.3329, lon: -90.1386},
          { name: "Rootdown - Lakeland", deal: "&#127968 House Deal", lat: 32.33369, lon: -90.1446},
          { name: "", deal: "", lat: 0, lon: 0},
  ],
  6: [ // Saturday
        // RIDGELAND
          { name: "Open Mind", deal: "&#128092 20% off Accessories", lat: 32.38819, lon:-90.11402},
          { name: "Rootdown - Old Canton", deal: "&#9889 BOGO 30% off full-spectrum Carts", lat: 32.36077, lon: -90.14643},
          // Ignite need to check on Saturday
          { name: "Southern Sky - Lakeland", deal: "&#127855 20% off Concentrates", lat: 32.3329, lon: -90.1386},
          { name: "Rootdown - Lakeland", deal: "&#9889 BOGO 30% off full-spectrum Carts", lat: 32.33369, lon: -90.14466},
          { name: "", deal: "", lat: 0, lon: 0},
  ]  
  
  
  // template { name: "", deal: "", lat: 0, lon: 0},
  // house: &#127968 flower: &#127804 concentrate: &#127855 chocolate bar: &#127851 topical: &#129524 tincture: &#128167 
  // pre-roll: &#128684 vape: &#9889 accessories: &#128092 beverages: &#127865 rewards points: &#129689
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
