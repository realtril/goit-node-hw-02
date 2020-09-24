exports.validate = function validate(scheme) {
  return (req, res, next) => {
    const validationResult = scheme.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  };
};

exports.tcWrapper = function tcWrapper(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res);
    } catch (error) {
      next(error);
    }
  };
};
