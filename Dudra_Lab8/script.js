$(document).ready(function() {
    const apiKey = '3807112914cc4b386c0261f899c84d9b'; 

    $('#getWeatherBtn').click(function() {
        let zipCode = $('#zipCode').val().trim();
        if (zipCode) {
            let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`;
            console.log('Requesting URL:', url); 

            $.ajax({
                method: "GET",
                url: url,
                dataType: "json"
            }).done(function(weatherResponse) {
                console.log('Weather Response:', weatherResponse); 
                $('#cityName').text(`City: ${weatherResponse.name}`);
                $('#condition').text(`Condition: ${weatherResponse.weather[0].description}`);
                $('#temperature').text(`Temperature: ${Math.round(weatherResponse.main.temp)}°F`);
                $('#wind').text(`Wind: ${Math.round(weatherResponse.wind.speed)} mph, ${weatherResponse.wind.deg}°`);
                $('#humidity').text(`Humidity: ${weatherResponse.main.humidity}%`);
                $('#tempMinMax').text(`Min/Max Temp: ${Math.round(weatherResponse.main.temp_min)}°F / ${Math.round(weatherResponse.main.temp_max)}°F`);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log('Error:', textStatus, errorThrown); 
                let errorMessage = 'Error retrieving weather data.';
                if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                    errorMessage += ` Details: ${jqXHR.responseJSON.message}`;
                }
                alert(errorMessage);
            });
        } else {
            alert('Please enter a ZIP code.');
        }
    });
});
