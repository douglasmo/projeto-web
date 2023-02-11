const middleware = {}

middleware['authMiddleware'] = require('..\\middleware\\authMiddleware.js')
middleware['authMiddleware'] = middleware['authMiddleware'].default || middleware['authMiddleware']

middleware['hideMiddleware'] = require('..\\middleware\\hideMiddleware.js')
middleware['hideMiddleware'] = middleware['hideMiddleware'].default || middleware['hideMiddleware']

export default middleware
