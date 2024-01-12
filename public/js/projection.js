const holiday = ['20220101', '20220201', '20220202', '20220203',
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

async function loadTable() {
    let res = await fetch(`/general/forecast`);
    let fetchData = await res.json();
  
    console.log(fetchData.weatherForecast);
  

    let tbody = document.querySelector('tbody') || document.body.appendChild(document.createElement('tbody'));
    let Weekday_Array = [];
    let Rainfall_Array = [];
    let Temperature_Array = [];
    let PublicHoliday_Array = [];
    let DateRow = document.createElement('tr');
    let LeftCell1 = document.createElement('td');
    LeftCell1.textContent = 'Date'; // This can be a header or some data
    DateRow.appendChild(LeftCell1);
    for (let days of fetchData.weatherForecast) {
        let item = document.createElement('td');
        item.textContent = days.forecastDate;
        DateRow.appendChild(item);
    }
    tbody.appendChild(DateRow);
    
    let WeekRow = document.createElement('tr');
    let LeftCell2 = document.createElement('td');
    LeftCell2.textContent = 'Weekday'; // This can be a header or some data
    WeekRow.appendChild(LeftCell2);
    for (let days of fetchData.weatherForecast) {
        let item = document.createElement('td');
        item.textContent = days.week;
        WeekRow.appendChild(item);
        if (item.textContent === 'Monday' || item.textContent === 'Tuesday' || item.textContent === 'Wednesday' || item.textContent === 'Thursday' || item.textContent === 'Friday') {
            Weekday_Array.push(0); // Adding 0 to the array
        } else if (item.textContent === 'Saturday' || item.textContent === 'Sunday') {
            Weekday_Array.push(1);
        }
    }
   
    tbody.appendChild(WeekRow);

 
    let TempRow = document.createElement('tr');
    let LeftCell3 = document.createElement('td');
    LeftCell3.textContent = 'Avg Temp (˚C)'; // This can be a header or some data
    TempRow.appendChild(LeftCell3);
    for (let days of fetchData.weatherForecast) {
        let item = document.createElement('td');
        let avgTemp = (days.forecastMaxtemp.value + days.forecastMintemp.value) / 2;
        item.textContent = avgTemp.toFixed(1); // Assuming you want to show one decimal place
        Temperature_Array.push(avgTemp); // Push average temperature into Temperature_Array
        TempRow.appendChild(item);
    }
    tbody.appendChild(TempRow);
   

    let RainRow = document.createElement('tr');
    let LeftCell4 = document.createElement('td');
    LeftCell4.textContent = 'Rainfall'; // This can be a header or some data
    RainRow.appendChild(LeftCell4);
    
    for (let days of fetchData.weatherForecast) {
        let item = document.createElement('td');
        item.textContent = days.PSR;
        RainRow.appendChild(item);
    
        if (item.textContent === 'Low') {
            Rainfall_Array.push(Math.round(Math.random() * 5));  // Add a random number between 0 and 5 to the Rainfall_Array array
        } else if (item.textContent === 'Medium Low') {
            Rainfall_Array.push(Math.round(Math.random() * 3.3)); // Add a random number between 0 and 3.3 to the Rainfall_Array array
        } else if (item.textContent === 'Medium') {
            Rainfall_Array.push(Math.round(Math.random() * 3.3 + 3.3)); // Add a random number between 3.3 and 6.6 to the Rainfall_Array array
        } else if (item.textContent === 'Medium High') {
            Rainfall_Array.push(Math.round(Math.random() * (77 - 31.7) + 31.7)); // Add a random number between 31.7 and 77 to the Rainfall_Array array
        } else if (item.textContent === 'High') {
            Rainfall_Array.push(Math.round(Math.random() * 77)); // Add a random number between 0 and 77 to the Rainfall_Array array
        }
   
        tbody.appendChild(RainRow);
    }
    

    

    let phRow = document.createElement('tr');
    let LeftCell5 = document.createElement('td');
    LeftCell5.textContent = 'Public Holiday';
    phRow.appendChild(LeftCell5);
    for (let days of fetchData.weatherForecast) {
        let item = document.createElement('td');
        if (holiday.includes(days.forecastDate)) {
            item.textContent = 'True'; // Capitalize the first letter
            PublicHoliday_Array.push(1);
            phRow.appendChild(item);
        } else {
            item.textContent = 'False'; // Capitalize the first letter
            phRow.appendChild(item);
            PublicHoliday_Array.push(0);
        }
    }
    tbody.appendChild(phRow);


    let PredictRow = document.createElement('tr');
    let LeftCell6 = document.createElement('td');
    LeftCell6.textContent = 'Predicted Amount'; // This can be a header or some data
    PredictRow.appendChild(LeftCell6);
    for (let days of fetchData.weatherForecast) {

    }
    tbody.appendChild(PredictRow);
    //console.log the varible array
    console.log('Weekday_Array: ' + JSON.stringify(Weekday_Array));
    console.log('Temperature_Array: ' + JSON.stringify(Temperature_Array));
    console.log('Rainfall_Array: '+ JSON.stringify(Rainfall_Array))
    console.log('PublicHoliday_Array: '+ JSON.stringify(PublicHoliday_Array))
    const newArrays = [];
    for (let i = 0; i < fetchData.weatherForecast.length; i++) {
        if (Weekday_Array.length > i && Temperature_Array.length > i &&
            Rainfall_Array.length > i && PublicHoliday_Array.length > i) {
            newArrays.push([
                Weekday_Array[i],
                Temperature_Array[i],
                Rainfall_Array[i],
                PublicHoliday_Array[i]
            ]);
        }
    }

    // Log the new arrays
    newArrays.forEach((arr, index) => {
        console.log(`new_data: ` + JSON.stringify(arr));
    });




// .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
// });
}
loadTable();
    // ... (Any additional code)

/*
// altenative table structuring way with function
function loop (x,y) {
    let row = document.createElement('tr');

    let LeftCell = document.createElement('td');
    LeftCell.textContent = x;
    row.appendChild(LeftCell);

for (let days of fetchData.weatherForecast) {
    let item = document.createElement('td');
    item.textContent = days[y];
    row.appendChild(item);
}
genTable.appendChild(row);
}
loop('Date','forecastDate');
loop('Weekday_Array','week');
loop('Condition','forecastWeather');
loop('Rainfall_Array','PSR');

*/