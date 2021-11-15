"use strict";

module.exports = (capability) => {
  return (req, res, next) => {
    try {
      if (
        req.user.capabilities.includes(capability) ||
        req.user.capabilities.includes(all)
      ) {
        next();
      } else {
        next("Access Denied");
      }
    } catch (e) {
      next("Invalid Login");
    }
  };
};
