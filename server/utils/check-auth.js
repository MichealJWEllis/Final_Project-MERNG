const { AuthenticationError } = require("apollo-server-express");
const jwt = require('jsonwebtoken')
const { KEY } = require('../config/config')

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, KEY);
                return user
            } catch (e) {
                throw new AuthenticationError('Token either Invalid or Expired')
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]')
    }
    throw new Error('Authentication header needed')
}