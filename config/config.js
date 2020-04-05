module.exports = {
    "database":"mongodb://localhost:27017/userAuthentication",
    port:process.env.PORT || 3200,
    SESS_LIFETIME : 1000 * 60 * 60 * 2,
    NODE_ENV : 'development',
    SESS_NAME : 'sid',
    SESS_SECRET : 'this is the secret for session which should be random number',
    secretKey : "JorrSeBolo@JaiMataDi"
}