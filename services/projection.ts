import { Router } from "express";

export let projectionRouter = Router();

projectionRouter.get("/general/forecast", async (req, res) => {


        try {
          const response = await fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en');
          const data = await response.json();
          res.json(data);
        } catch (error) {
          res.status(500).json({ error: 'An error occurred' });
        }
      });

        // fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en')

        // .then(res => {
        //     if (!res.ok) {
        //         throw new Error('Network response was not ok ' + res.statusText);
        //     }
        //     return res.json();
        // })

        // .then((data) => {
        //      return data.json()
        //     })
        // .then ((obj) => {console.log(obj)});


        //return res.json(data);
        // .then((callData) => console.log(callData))
        // let result = data.weatherForecast
        // console.log(data.weatherForecast)
        // res.json(result);
    
    // .catch(error => {
    //     console.error('There has been a problem with your fetch operation:', error);
    // });
    
    // catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "internal service error" });





    
    // })
