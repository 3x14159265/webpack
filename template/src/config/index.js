'use strict'

if(process.env.CORE_MODE === 'production') {
    module.exports = require('./prod.config')
}
else if(process.env.CORE_MODE === 'testing') {
    module.exports = require('./test.config')
}
else {
    module.exports = require('./dev.config')
}
