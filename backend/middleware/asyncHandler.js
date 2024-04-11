// function that takes req, res, next and will resolve a promise that calls next middleware
// used to handle errors through express
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;