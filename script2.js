function displayCurrentDate() {
    const dateElement = document.getElementById("currentDate");
    
    // Get the current date
    const now = new Date();
    
    // Array of days to get the correct day name
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Format the date
    const dayName = days[now.getDay()];
    const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // Display the result
    dateElement.textContent = `${dayName}, ${formattedDate}`;
}

// Run the function when the page loads
window.onload = displayCurrentDate;