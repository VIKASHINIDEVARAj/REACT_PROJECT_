// 404 Not Found Middleware
// Indha route-ey illana idhu trigger aagum
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global Error Handler
// Project-la enga error vandhalum ivan thaan katchi pidippaar
const errorHandler = (err, req, res, next) => {
  // Sila neram status code 200-ah irukum but error vandhirukum, 
  // appo namma force-ah 500 (Server Error) nu mathanum
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose-la "CastError" (wrong ID) vandha handle panna:
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found. Id thappa kudukura kiddo!';
  }

  res.status(statusCode).json({
    message: message,
    // Development mode-la mattum thaan error stack kaatanum
    // Production-la hide pannidanum (Security purpose!)
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };