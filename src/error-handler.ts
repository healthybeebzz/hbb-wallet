/*
    Catches and logs all errors. Returns 500 and a general message to the user.
 */
export const errorHandler = (err, req, res, next) => {
    console.log("err ", err);
    res.status(500).send('Oops, something went wrong!');
}


