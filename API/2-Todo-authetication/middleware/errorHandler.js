const err = (err, req, res, next) => {
  const status = err.status || 500; // Use error's status or default to 500 (Internal Server Error)
  const message = err.status || "Internal server error"; // ❌ There's a mistake here! It should be err.message

  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

module.exports = err;
