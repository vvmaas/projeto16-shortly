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

async function getUrl(req,res) {
    const id = req.params.id

    try {
        const findUrl = await connection.query(`SELECT id, short_url, url FROM urls WHERE id=$1`, [id])
        const response = findUrl.rows[0]

        if(!response){
            return res.sendStatus(404)
        }

        res.send({id: response.id, shortUrl: response.short_url, url: response.url}).status(200)
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

async function goToUrl(req,res) {
    const short_url = req.params.shortUrl

    try {
        const findUrl = await connection.query(`SELECT id, short_url, url, view_count FROM urls WHERE short_url=$1`, [short_url])
        const response = findUrl.rows[0]

        if(!response){
            return res.sendStatus(404)
        }

        let view_count = findUrl.rows[0].view_count + 1
        const url = findUrl.rows[0].url

        await connection.query(`UPDATE urls SET view_count=$1 WHERE short_url=$2`, [view_count, short_url])

        res.redirect(url)
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

async function deleteUrl(req,res){
    const id = res.locals.params.id
    const user_id = res.locals.user_id

    try {
        const verifyUrl = await connection.query(`SELECT * FROM urls WHERE id=$1`, [id])
        if(!verifyUrl.rows[0]){
            return res.sendStatus(404)
        }

        const verifyOwner = await connection.query(`SELECT * FROM urls WHERE id=$1 AND user_id=$2`, [id, user_id])
        if(!verifyOwner.rows[0]){
            return res.sendStatus(401)
        }

        await connection.query(`DELETE FROM urls WHERE id=$1`, [id])
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export { shortenUrl, getUrl, goToUrl, deleteUrl }