const errorHandles = {
handle404 : (req, res, next) => {
    const error = new Error('404 Not found');
    error.status = 404;
    next(error);
},

otherErrors : (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
 },

corsError : (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin', 'X-Requested-Width', 'Content-Type', 'Accept', 'Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','POST','PATCH','DELETE','GET');
        return res.status(200).json({});
    }
    next()
}

}
export default errorHandles;

