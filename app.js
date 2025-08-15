// Train Search App JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('trainSearchForm');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const dateInput = document.getElementById('date');
    const resultsDiv = document.getElementById('results');

    // Set default date to today
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    dateInput.value = formattedDate;

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get form values
        const fromStation = fromInput.value.trim();
        const toStation = toInput.value.trim();
        const travelDate = dateInput.value;
        
        // Validate inputs
        if (!fromStation || !toStation || !travelDate) {
            alert('Please fill in all fields.');
            return;
        }
        
        if (fromStation.toLowerCase() === toStation.toLowerCase()) {
            alert('From and To stations cannot be the same.');
            return;
        }
        
        // Show loading message
        showLoading();
        
        // Simulate API call with setTimeout
        setTimeout(() => {
            searchTrains(fromStation, toStation, travelDate);
        }, 1500);
    });
    
    // Function to show loading state
    function showLoading() {
        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h3>Searching for trains...</h3>
                <div style="margin-top: 20px;">
                    <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #2c5aa0; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                </div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
    }
    
    // Function to simulate train search results
    function searchTrains(from, to, date) {
        // Sample train data (in a real app, this would come from an API)
        const mockTrains = [
            {
                trainNo: '12345',
                trainName: 'Express Special',
                departure: '08:30',
                arrival: '14:45',
                duration: '6h 15m',
                price: '₹850'
            },
            {
                trainNo: '67890',
                trainName: 'Rapid Transit',
                departure: '11:15',
                arrival: '16:30',
                duration: '5h 15m',
                price: '₹1200'
            },
            {
                trainNo: '11111',
                trainName: 'Superfast Express',
                departure: '15:45',
                arrival: '20:15',
                duration: '4h 30m',
                price: '₹1500'
            }
        ];
        
        // Format the date for display
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Generate results HTML
        let resultsHTML = `
            <h3>Train Search Results</h3>
            <p><strong>From:</strong> ${from} <strong>To:</strong> ${to}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <div style="margin-top: 20px;">
        `;
        
        mockTrains.forEach(train => {
            resultsHTML += `
                <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 15px; background-color: #f9f9f9;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: #2c5aa0;">${train.trainName} (${train.trainNo})</h4>
                            <p style="margin: 5px 0;"><strong>Departure:</strong> ${train.departure} | <strong>Arrival:</strong> ${train.arrival}</p>
                            <p style="margin: 5px 0;"><strong>Duration:</strong> ${train.duration}</p>
                        </div>
                        <div style="text-align: right;">
                            <p style="margin: 5px 0; font-size: 18px; font-weight: bold; color: #2c5aa0;">${train.price}</p>
                            <button style="background-color: #2c5aa0; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;" onclick="bookTrain('${train.trainNo}', '${train.trainName}')">Book Now</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        resultsHTML += '</div>';
        
        // Display results
        resultsDiv.innerHTML = resultsHTML;
    }
});

// Function to handle train booking (placeholder)
function bookTrain(trainNo, trainName) {
    alert(`Booking functionality for ${trainName} (${trainNo}) will be implemented in future updates.`);
}

// Function to swap From and To stations
function swapStations() {
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
}

// Add some popular stations for auto-suggestions (future enhancement)
const popularStations = [
    'New Delhi',
    'Mumbai Central',
    'Bangalore City',
    'Chennai Central',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow'
];
