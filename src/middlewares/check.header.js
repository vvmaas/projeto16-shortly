import connection from "../database/db.js";

async function checkHeader(req,res,next) {
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ', "")

    try {
        const checkSession = await connection.query(`SELECT * FROM sessions WHERE token=$1`, [token])
        if(!checkSession.rows[0] || !token){
            return res.sendStatus(401)
        } 
        res.locals.user_id = checkSession.rows[0].user_id
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }

    res.locals.params = req.params
    res.locals.body = req.body

    next()
}

export default checkHeader