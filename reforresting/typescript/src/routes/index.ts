import { Router } from "express";
import plantsRouter from "./plants.router";

const routes = Router();

routes.use('/plants', plantsRouter);

export default routes;
