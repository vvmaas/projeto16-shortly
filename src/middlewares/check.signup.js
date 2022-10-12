function checkValuesSignUp(req,res,next) {
    const user = req.body
    res.locals.user = req.body

    if(!user.name || !user.email || !user.password || !user.confirmPassword){
        return res.sendStatus(422)
    }

    if(typeof(user.name) !== 'string' || typeof(user.email) !== 'string' || typeof(user.password) !== 'string' || typeof(user.confirmPassword) !== 'string'){
        return res.sendStatus(422)
    }

    if(user.name === ""|| user.email === "" || user.password === "" || user.confirmPassword === ""){
        return res.sendStatus(422)
    }

    if(user.password !== user.confirmPassword){
        return res.sendStatus(422)
    }

    next()
}

export default checkValuesSignUp