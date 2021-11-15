'use strict';

const { Users } = require('./src/models/user.js');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const basicAuth = async (req, res, next) => {
	let basicHeaderParts = req.headers.authorization.split(' ');
	let encodedString = basicHeaderParts.pop();
	let decodedString = base64.decode(encodedString);
	let [username, password] = decodedString.split(':');

	try {
		const user = await Users.findOne({ where: { username: username } });
		const valid = await bcrypt.compare(password, user.password);
		if (valid) {
			req.user = user;
			next();
		}
		else {
			throw new Error('Invalid User')
		}
	} catch (error) { res.status(403).send("Invalid Login"); }
}

module.exports = basicAuth;
//-----------------------------------------------
'use strict';

const base64 = require('base-64');
const { users } = require('../../models');

module.exports = async (req, res, next) => {
	if (!req.headers.authorization) { return _authError(); }

	let basic = req.headers.authorization.split(' ').pop();
	let [user, pass] = base64.decode(basic).split(':');

	try {
		req.user = await users.authenticateBasic(user, pass)
		next();
	} catch (e) {
		_authError()
	}

	function _authError() {
		res.status(403).send('Invalid Login');
	}
}
