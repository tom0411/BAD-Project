import { Router } from "express";

export let projectionRouter = Router();

projectionRouter.get("/forecast", async (req, res) => {
    try{
        fetch('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en')
        res.json("ok");
    } catch (err) {
        console.log(err);
        res.json({ err: "internal service error"});
    }
})