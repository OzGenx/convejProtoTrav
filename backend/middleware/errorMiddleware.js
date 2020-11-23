//error handling using middleware: @objective to send back a json object with a message instead of a html page


//fallback for 404 errors( anything that's not an actual route)

        //function that has access to the request response cycle
const notFound = (req, res, next)=> {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)


}

// using middleware for overwriting the default error handler

const errorHandler = (err, req, res, next)=> {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        //get stack trace if not in production
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {notFound, errorHandler }