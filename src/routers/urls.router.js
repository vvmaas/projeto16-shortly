import { Router } from "express";
import { shortenUrl } from "../controllers/urls.controller.js";
import checkHeader from "../middlewares/check.header.js";
import checkUrl from "../middlewares/check.url.js";

const urlsRouter = Router()

urlsRouter.post('/urls/shorten', checkHeader, checkUrl, shortenUrl)
urlsRouter.get('/urls/:id')
urlsRouter.get('/urls/open/:shortUrl')
urlsRouter.delete('/urls/:id')

export default urlsRouter