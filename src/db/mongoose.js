const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017/shop'

mongoose.connect(connectionURL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})