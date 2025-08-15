// Train Search App JavaScript

// Wait for the DOM to be fully loaded
document.getElementById('trainSearchForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const fromStation = document.getElementById('from').value.trim().toUpperCase();
    const toStation = document.getElementById('to').value.trim().toUpperCase();
    const date = document.getElementById('date').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Searching for real trains...';

    const url = `https://indian-railway-irctc.p.rapidapi.com/api/v2/trainBetweenStations?fromStationCode=${fromStation}&toStationCode=${toStation}&dateOfJourney=${date}&isH5=true&client=web`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapid-api': 'rapid-api-database',
            'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com',
            'x-rapidapi-key': 'a4ab298228mshfb794f380e4e4e1p11e004jsn6cfcc8a0a74a'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!result.data || !result.data.trains || !result.data.trains.length) {
            resultsDiv.innerHTML = 'No trains found for this route/date.';
            return;
        }

        let html = `<h3>Available Trains from ${fromStation} to ${toStation} on ${date}:</h3>`;
        result.data.trains.forEach(train => {
            html += `
            <div>
                <strong>${train.train_name} (${train.train_number})</strong><br>
                From: ${train.from_station_name} at ${train.from_std}<br>
                To: ${train.to_station_name} at ${train.to_sta}<br>
                <hr>
            </div>`;
        });
        resultsDiv.innerHTML = html;
    } catch (err) {
        resultsDiv.innerHTML = 'API error or too many requests!';
    }
});
