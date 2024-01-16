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

