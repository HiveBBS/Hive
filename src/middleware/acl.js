'use strict';

module.exports = (capability) => {
	return (req, res, next) => {

		const [self, all] = capability;

		if (req.user.capabilities.includes(self) || req.user.capabilities.includes(all)) {
			next();
		} else {
			next('Access Denied');
		}
	};
};
