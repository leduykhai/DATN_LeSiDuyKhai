let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let db = require('./api/Config/database')
const adminsRoutes = require('./api/Routes/admins.routes')
const nguoidungsRoutes = require('./api/Routes/nguoidungs.routes')
let app = express()
app.use(cors())
let port = 3000

// let port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// routes
adminsRoutes(app)
nguoidungsRoutes(app)


app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(port, function () {
    console.log('server running')
})

console.log('Express app started on port: ' + port)

db.connect(function (err) {
    if (err) {
        console.log('Err in connect')
        throw err
    } else {
        console.log('Successful connection')
    }
})