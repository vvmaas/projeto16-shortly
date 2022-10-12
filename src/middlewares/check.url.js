function checkUrl(req,res,next){
    const url = res.locals.body.url

    const validator = /^(ftp|http|https):\/\/[^ "]+$/;

    if(!validator.test(url)){
        return res.sendStatus(422)
    }

    next()
}

export default checkUrl