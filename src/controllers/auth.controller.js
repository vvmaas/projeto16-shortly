import connection from '../database/db.js'
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid'

async function signUp(req,res) {
    const user = res.locals.user

    try {
        const emailCheck = await connection.query(`SELECT * FROM users WHERE email=$1`, [user.email])

        if (emailCheck.rows[0]){
            return res.sendStatus(409)
        }

        const hashedPassword = bcrypt.hashSync(user.password, 10)

        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3)`, [user.name, user.email, hashedPassword])

        res.sendStatus(201)
    } catch (error) {
       res.sendStatus(500) 
    }
}

async function signIn(req,res){
    const user = res.locals.user

    try {
        const verifyUser = await connection.query(`SELECT id, email, password FROM users WHERE email=$1`, [user.email])
        const userRegister = verifyUser.rows[0]
        const hash = userRegister.password

        if(!userRegister || !bcrypt.compareSync(user.password, hash)){
            res.sendStatus(401)
        }

        const token = uuid()

        await connection.query(`INSERT INTO sessions (user_id, token) VALUES ($1,$2)`, [userRegister.id, token])

        res.send({token: token}).status(200)
    } catch (error) {
        res.sendStatus(500) 
    }
}

export { signUp, signIn }