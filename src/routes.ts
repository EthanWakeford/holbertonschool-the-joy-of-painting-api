import { Router } from "express";
import GetData from "./controllers/getdata";
import PostData from "./controllers/postData";

const routes = Router();

routes.get('/episodes', GetData.episodes);
routes.post('/episodes', PostData.f)

export default routes;
