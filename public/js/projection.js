
fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en')
.then(res => {
    if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
    }
    return res.json();
})
.then(data => {
    console.log(data.weatherForecast);

    let tbody = document.querySelector('tbody') || document.appendChild(document.createElement('tbody'));
    
    let row1 = document.createElement('tr');
    let firstCellRow1 = document.createElement('td');
    firstCellRow1.textContent = 'Date'; // This can be a header or some data
    row1.appendChild(firstCellRow1);
    for (let days of data.weatherForecast) {
        let item = document.createElement('td');
        item.textContent = days.forecastDate;
        row1.appendChild(item);
    }
    tbody.appendChild(row1);

    let row2 = document.createElement('tr');
    let firstCellRow2 = document.createElement('td');
    firstCellRow2.textContent = 'Weekday'; // This can be a header or some data
    row2.appendChild(firstCellRow2);
    for (let days of data.weatherForecast) {
        let item = document.createElement('td');
        item.textContent = days.week;
        row2.appendChild(item);
    }
    tbody.appendChild(row2);

    let row3 = document.createElement('tr');
    let firstCellRow3 = document.createElement('td');
    firstCellRow3.textContent = 'Avg Temp (˚C)'; // This can be a header or some data
    row3.appendChild(firstCellRow3);
    for (let days of data.weatherForecast) {
        let item = document.createElement('td');
        let avgTemp = (days.forecastMaxtemp.value + days.forecastMintemp.value) / 2;
        item.textContent = avgTemp.toFixed(1); // Assuming you want to show one decimal place
        row3.appendChild(item);
    }
    tbody.appendChild(row3);

    let row4 = document.createElement('tr');
    let firstCellRow4 = document.createElement('td');
    firstCellRow4.textContent = 'Rainfall'; // This can be a header or some data
    row4.appendChild(firstCellRow4);
    for (let days of data.weatherForecast) {
        let item = document.createElement('td');
        item.textContent = days.PSR;
        row4.appendChild(item);
    }
    tbody.appendChild(row4);

})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});







    // let row1 = document.createElement('tr');
    // for (let days of data.weatherForecast) {
    //     let item = document.createElement('td');
    //     item.textContent = days.forecastDate;
    //     row1.appendChild(item);
    // }
    //     genTable.appendChild(row1);

    // for (let itemKey in data.weatherForecast) {
    //     let item = data.weatherForecast[itemKey];
    //     let tr = document.createElement('tr');
    
    //     for (let key in item) {
    //         let td = document.createElement('td');
    
    //         td.textContent = item[key];
    
    //         tr.appendChild(td);
    //     }
    //     genTable.appendChild(tr);
    //     }
    // });

    // let row2 = document.createElement('tr');
    // for (let days of data.weatherForecast) {
    //     let item = document.createElement('td');
    //     item.textContent = days.week;
    //     row2.appendChild(item);
    // }
    //     genTable.appendChild(row2);

    // let row3 = document.createElement('tr');
    // for (let days of data.weatherForecast) {
    //     let item = document.createElement('td');
    //     item.textContent = (days.forecastMaxtemp.value + days.forecastMintemp.value)/2;
    //     row3.appendChild(item);
    // }
    //     genTable.appendChild(row3);

    // let row4 = document.createElement('tr');
    // for (let days of data.weatherForecast) {
    //     let item = document.createElement('td');
    //     item.textContent = days.PSR;
    //     row4.appendChild(item);
    // }
    //     genTable.appendChild(row4);
