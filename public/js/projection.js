
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
    
        if (item.textContent === 'Low') {
            console.log(Math.round(Math.random() * 5));  // Log a random number between 0 and 5
        }
        else if (item.textContent === 'Medium Low') {
            console.log(Math.round(Math.random() * 3.3)); // Log a random number between 0 and 3.3
        }
        else if (item.textContent === 'Medium') {
            console.log(Math.round(Math.random() * 3.3 + 3.3)); // Log a random number between 3.3 and 6.6
        }
        else if (item.textContent === 'Medium High') {
            console.log(Math.round(Math.random() * (77 - 31.7) + 31.7)); // Log a random number between 31.7 and 77
        }
        else if (item.textContent === 'High') {
            console.log(Math.round(Math.random() * 77)); // Log a random number between 0 and 77
        }
        
        tbody.appendChild(row4);
    }
    
    tbody.appendChild(row4);
    

    
    let row5 = document.createElement('tr');
    let firstCellRow5 = document.createElement('td');
    firstCellRow5.textContent = 'Predicted Amount'; // This can be a header or some data
    row5.appendChild(firstCellRow5);
    for (let days of data.weatherForecast) {

    }
    tbody.appendChild(row5);

})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});

/*

function loop (x,y) {
    let row = document.createElement('tr');

    let firstCellRow = document.createElement('td');
    firstCellRow.textContent = x;
    row.appendChild(firstCellRow);

for (let days of data.weatherForecast) {
    let item = document.createElement('td');
    item.textContent = days[y];
    row.appendChild(item);
}
genTable.appendChild(row);
}
loop('Date','forecastDate');
loop('Weekday','week');
loop('Condition','forecastWeather');
loop('Rainfall','PSR');

*/