import { Router } from "express";

export let projectionRouter = Router();

projectionRouter.get("/forecast", async (req, res) => {
    try{

    } catch (err) {
        console.log(err);
        res.json({ err: "internal service error"});
    }
})