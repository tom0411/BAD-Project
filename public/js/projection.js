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
        let stringDate = days.forecastDate;
        item.textContent = stringDate.substr(6,2) + "/" + stringDate.substr(4,2) + "/" + stringDate.substr(0,4);
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
            Rainfall_Array.push(0);  // Low is 0
        } else if (item.textContent === 'Medium Low') {
            Rainfall_Array.push(Math.round(Math.random() * 3.3)); // Medium Low is 0 to 3.3
        } else if (item.textContent === 'Medium') {
            Rainfall_Array.push(Math.round(Math.random() * 3.3 + 3.3)); // Medium is 3.3 to 6.6
        } else if (item.textContent === 'Medium High') {
            Rainfall_Array.push(Math.round(Math.random() * (77 - 31.7) + 31.7)); // Medium High is 31.7 to 77
        } else if (item.textContent === 'High') {
            Rainfall_Array.push(Math.round(Math.random() * (100 - 77) + 77)); // High is 77 to 100
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
            item.textContent = 'Yes'; // Capitalize the first letter
            PublicHoliday_Array.push(1);
            phRow.appendChild(item);
        } else {
            item.textContent = 'No'; // Capitalize the first letter
            phRow.appendChild(item);
            PublicHoliday_Array.push(0);
        }
    }
    tbody.appendChild(phRow);


    let rowPic = document.createElement('tr');
    let leftSidePic = document.createElement('td');
    leftSidePic.textContent = 'Condition';
    rowPic.appendChild(leftSidePic);
        for (let days of fetchData.weatherForecast) {
            let item = document.createElement('td');
            item.innerHTML = `<img src="https://www.hko.gov.hk/images/HKOWxIconOutline/pic${days.ForecastIcon}.png" width="50%"/>`;
            rowPic.appendChild(item);
    }
    tbody.appendChild(rowPic);
    


    //console.log the varible array

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

    // Print the arrays
    // console.log(fetchData.weatherForecast);
    // console.log('Weekday_Array: ' + JSON.stringify(Weekday_Array));
    // console.log('Temperature_Array: ' + JSON.stringify(Temperature_Array));
    // console.log('Rainfall_Array: '+ JSON.stringify(Rainfall_Array))
    // console.log('PublicHoliday_Array: '+ JSON.stringify(PublicHoliday_Array))
    // newArrays.forEach((arr) => {
    //     console.log(`projected_data: ` + JSON.stringify(arr));
    // });
      
    function addRowToSecondTable(header, data) {
        let row = document.createElement('tr');
        let headerCell = document.createElement('td');
        headerCell.textContent = header;
        row.appendChild(headerCell);
    
        for (let value of data) {
            let cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        }
        // Make sure secondTableBody is a defined reference to the tbody element in your second table
        secondTableBody.appendChild(row);
    }
    
    let currentDate = new Date();
    let day = currentDate.getDate() + 1; // Get tomorrow's date
    let month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    let year = currentDate.getFullYear()-1;
    
    let dateArray = []; // Initialize an empty array to store the future dates
    
    for (let i = 0; i < 9; i++) {
        let futureDate = new Date(year, month - 1, day + i); // Calculate the future date
        let futureDay = futureDate.getDate();
        let futureMonth = futureDate.getMonth() + 1; // Month is zero-based, so we add 1
        let futureYear = futureDate.getFullYear();
    
        if (futureDay < 10) {
            futureDay = '0' + futureDay;
        }
        if (futureMonth < 10) {
            futureMonth = '0' + futureMonth;
        }
    
        let formattedDate = futureDay + '/' + futureMonth + '/' + futureYear;
        dateArray.push(formattedDate); // Add the formatted date to the array
    }
    
    // Now pass the dynamically generated dateArray to the function
    addRowToSecondTable('Date', dateArray);
    addRowToSecondTable('Amount', ['Data 1', 'Data 2', 'Data 3', 'Data 3', 'Data 3', 'Data 3', 'Data 3', 'Data 3', 'Data 3']);
    addRowToSecondTable('Increase/Decrease', ['Data 4', 'Data 5', 'Data 6', 'Data 3', 'Data 3', 'Data 3', 'Data 3', 'Data 3', 'Data 3']);
    
  

// Assuming 'tbody' is already defined and is the correct <tbody> element of your table
// Replace with your actual tbody selector

fetch('http://localhost:8000/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newArrays) // Make sure newArrays is defined and holds the data you want to send
})
.then(response => response.json()) // Parse the JSON from the response
.then(data => {
    // Access the "Predicted demands" property of the object and print it
    if (data && Array.isArray(data["Predicted demands"])) {
        // Log the array from the "Predicted demands" property
        console.log(data["Predicted demands"]);

        // Your predicted data array
        let predictions = data["Predicted demands"];

        // Create a new table row for predictions
        let PredictRow = document.createElement('tr');

        // Add a header or label cell to the row
        let headerCell = document.createElement('td');
        headerCell.textContent = 'Predicted Amount';
        PredictRow.appendChild(headerCell);

        // Loop through the predictions array
        for (let predictedValue of predictions) {
            // Create a new cell for the current predicted value
            let cell = document.createElement('td');
            cell.textContent = predictedValue;
            PredictRow.appendChild(cell); // Append the cell to the PredictRow
        }

        // Append the new row to the table body
        tbody.appendChild(PredictRow);
    } else {
        console.log("No 'Predicted demands' array found or the property is not an array.");
    }
})
.catch(error => {
    console.error('Error:', error);
}); // Append the entire row to the table body
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