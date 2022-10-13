import connection from '../database/db.js'

async function getMe(req,res) {
    const token = res.locals.token
    
    try {

        let userCheck = await connection.query(`SELECT * FROM sessions JOIN users ON sessions.user_id=users.id WHERE sessions.token=$1`, [token])

        if(!userCheck.rows[0]){
            return res.sendStatus(404)
        }

        const user_id = userCheck.rows[0].user_id

        let user = await connection.query(`
                SELECT users.id, users.name, COALESCE(SUM(urls.view_count), 0) AS "viewCount"
                    FROM users 
                        LEFT JOIN sessions ON sessions.user_id=users.id
                            LEFT JOIN urls ON urls.user_id=users.id
                                WHERE users.id=$1
                                    GROUP BY users.id
                                        `, [user_id])
        
        const urlsFromUser = await connection.query(`SELECT id, short_url AS "shortUrl", url, view_count AS "visitCount" FROM urls WHERE user_id=$1`, [user_id])

        const response = {...user.rows[0], shortenedUrls: urlsFromUser.rows}

        res.send(response).status(200)

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

async function getRanking(req,res) {
    try {
        const response = await connection.query(`
        SELECT users.id, users.name, COALESCE(COUNT(urls), 0) AS linksCount, COALESCE(SUM(urls.view_count), 0) AS "viewCount"
            FROM users 
                LEFT JOIN urls ON urls.user_id=users.id
                    GROUP BY users.id
                        ORDER BY "viewCount" DESC
                            LIMIT 10
                        `)

                        

        res.send(response.rows).status(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

export { getMe, getRanking }