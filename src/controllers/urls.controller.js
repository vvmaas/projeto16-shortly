import connection from '../database/db.js'
import { nanoid } from 'nanoid'

async function shortenUrl(req,res) {
    const url = res.locals.body.url
    const user_id = res.locals.user_id
    const short_url = nanoid(15)

    try {
        await connection.query(`INSERT INTO urls (user_id, url, short_url) VALUES ($1,$2,$3)`, [user_id,url,short_url])

        res.send({shortUrl: short_url}).status(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export { shortenUrl }