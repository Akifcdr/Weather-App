async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '381a2e240c2f417f9d7210538252603';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        document.getElementById('weatherResult').innerHTML = `
            <h3>${data.location.name}, ${data.location.country}</h3>
            <p><i class="fas fa-thermometer-half"></i> Temperature: ${data.current.temp_c}°C</p>
            <p><i class="fas fa-tint"></i> Humidity: ${data.current.humidity}%</p>
            <p><i class="fas fa-wind"></i> Wind Speed: ${data.current.wind_kph} km/h</p>
            <p><i class="fas fa-cloud"></i> ${data.current.condition.text}</p>
        `;

        const condition = data.current.condition.text.toLowerCase();
        const body = document.body;
        if (condition.includes('rain') || condition.includes('shower') || condition.includes('drizzle')) {
            body.style.background = '#ADD8E6';
        } else if (condition.includes('sunny') || condition.includes('clear')) {
            body.style.background = '#FFFACD';
        } else if (condition.includes('cloudy') || condition.includes('overcast')) {
            body.style.background = '#D3D3D3';
        } else if (condition.includes('snow') || condition.includes('blizzard')) {
            body.style.background = '#F0F8FF';
        } else if (condition.includes('fog') || condition.includes('mist')) {
            body.style.background = '#E6E6FA';
        } else if (condition.includes('storm') || condition.includes('thunder')) {
            body.style.background = '#B0C4DE';
        } else {
            body.style.background = '#72CFF9';
        }

    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `
            <p style="color: #FF6B6B;"><i class="fas fa-exclamation-circle"></i> Error fetching data</p>
        `;
        document.body.style.background = '#72CFF9';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}