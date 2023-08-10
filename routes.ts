import { Router } from "express";
import GetData from "./src/controllers/getdata";
import PostData from "./src/controllers/postData";

const routes = Router();

routes.get('/episodes', GetData.episodes);
routes.post('/episodes', PostData.f)

export default routes;