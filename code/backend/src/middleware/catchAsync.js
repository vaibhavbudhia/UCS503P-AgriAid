// Express 4 doesn't forward rejected promises from async handlers to
// next() automatically -- wrap handlers with this so errors reach the
// error-handling middleware instead of crashing the process.
module.exports = function catchAsync(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
};
