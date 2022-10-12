function checkValuesSignIn(req,res,next) {
    const user = req.body
    res.locals.user = req.body

    if( !user.email || !user.password ){
        return res.sendStatus(422)
    }

    if(typeof(user.email) !== 'string' || typeof(user.password) !== 'string'){
        return res.sendStatus(422)
    }

    if(user.email === "" || user.password === ""){
        return res.sendStatus(422)
    }

    next()
}

export default checkValuesSignIn