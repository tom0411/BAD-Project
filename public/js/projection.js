const holidays = ['20220101', '20220201', '20220202', '20220203',
'20220405', '20220415', '20220416', '20220418',
'20220502', '20220509', '20220603', '20220701',
'20220912', '20221001', '20221004', '20221226',
'20221227', '20230102', '20230123', '20230124',
'20230125', '20230405', '20230407', '20230408',
'20230410', '20230501', '20230526', '20230622',
'20230701', '20230930', '20231002', '20231023',
'20231225', '20231226', '20240101', '20240210',
'20240212', '20240213', '20240329', '20240330',
'20240401', '20240404', '20240501', '20240515',
'20240610', '20240701', '20240918', '20241001',
'20241011', '20241225', '20241226'];


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
    
    let DateRow = document.createElement('tr');
    let LeftCell1 = document.createElement('td');
    LeftCell1.textContent = 'Date'; // This can be a header or some data
    DateRow.appendChild(LeftCell1);
    for (let days of data.weatherForecast) {
        let item = document.createElement('td');
        item.textContent = days.forecastDate;
        DateRow.appendChild(item);
    }
    tbody.appendChild(DateRow);

    let WeekRow = document.createElement('tr');
    let LeftCell2 = document.createElement('td');
    LeftCell2.textContent = 'Weekday'; // This can be a header or some data
    WeekRow.appendChild(LeftCell2);
    for (let days of data.weatherForecast) {
        let item = document.createElement('td');
        item.textContent = days.week;
        WeekRow.appendChild(item);
    }
    tbody.appendChild(WeekRow);

    let TempRow = document.createElement('tr');
    let LeftCell3 = document.createElement('td');
    LeftCell3.textContent = 'Avg Temp (˚C)'; // This can be a header or some data
    TempRow.appendChild(LeftCell3);
    for (let days of data.weatherForecast) {
        let item = document.createElement('td');
        let avgTemp = (days.forecastMaxtemp.value + days.forecastMintemp.value) / 2;
        item.textContent = avgTemp.toFixed(1); // Assuming you want to show one decimal place
        TempRow.appendChild(item);
    }
    tbody.appendChild(TempRow);

    let RainRow = document.createElement('tr');
    let LeftCell4 = document.createElement('td');
    LeftCell4.textContent = 'Rainfall'; // This can be a header or some data
    RainRow.appendChild(LeftCell4);
    
    for (let days of data.weatherForecast) {
        let item = document.createElement('td');
        item.textContent = days.PSR;
        RainRow.appendChild(item);
    
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
        
        tbody.appendChild(RainRow);
    }
    
    tbody.appendChild(RainRow);
    

    let phRow = document.createElement('tr');
    let LeftCell5 = document.createElement('td');
    LeftCell5.textContent = 'Public Holiday';
    phRow.appendChild(LeftCell5);
    for (let days of data.weatherForecast) {
    let item = document.createElement('td');
        if (holidays.includes(days.forecastDate)) {
    item.textContent = true;
    phRow.appendChild(item);
        } else {item.textContent =  false
                phRow.appendChild(item);};
    }
    tbody.appendChild(phRow);


    
    let PredictRow = document.createElement('tr');
    let LeftCell6 = document.createElement('td');
    LeftCell6.textContent = 'Predicted Amount'; // This can be a header or some data
    PredictRow.appendChild(LeftCell6);
    for (let days of data.weatherForecast) {

    }
    tbody.appendChild(PredictRow);

})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});

/*
// altenative table structuring way with function
function loop (x,y) {
    let row = document.createElement('tr');

    let LeftCell = document.createElement('td');
    LeftCell.textContent = x;
    row.appendChild(LeftCell);

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