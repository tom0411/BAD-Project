let genTable = document.getElementById("fromHKO");


    fetch ("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en")
    .then(res => {
        if(!res.ok) {
            console.log("problem");
            return;
        }

        return res.json();
    })
    .then(data => {
        console.log(data.weatherForecast)

        let row1 = document.createElement("tr");
        for (let days of data.weatherForecast) {
            let item = document.createElement("td");
            item.textContent = days.forecastDate;
            row1.appendChild(item);
        }
            genTable.appendChild(row1);

        let row2 = document.createElement("tr");
        for (let days of data.weatherForecast) {
            let item = document.createElement("td");
            item.textContent = days.week;
            row2.appendChild(item);
        }
            genTable.appendChild(row2);
    
        let row3 = document.createElement("tr");
        for (let days of data.weatherForecast) {
            let item = document.createElement("td");
            item.textContent = (days.forecastMaxtemp.value + days.forecastMintemp.value)/2;
            row3.appendChild(item);
        }
            genTable.appendChild(row3);

        let row4 = document.createElement("tr");
        for (let days of data.weatherForecast) {
            let item = document.createElement("td");
            item.textContent = days.PSR;
            row4.appendChild(item);
        }
            genTable.appendChild(row4);
    
    })
    .catch( error => {
        console.log(error)
    });
