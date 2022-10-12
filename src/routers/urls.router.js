import { Router } from "express";
import { shortenUrl, getUrl, goToUrl, deleteUrl } from "../controllers/urls.controller.js";
import checkHeader from "../middlewares/check.header.js";
import checkUrl from "../middlewares/check.url.js";

const urlsRouter = Router()

urlsRouter.post('/urls/shorten', checkHeader, checkUrl, shortenUrl)
urlsRouter.get('/urls/:id', getUrl)
urlsRouter.get('/urls/open/:shortUrl', goToUrl)
urlsRouter.delete('/urls/:id', checkHeader, deleteUrl)

export default urlsRouter