let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let db = require('./api/Config/database');
const usersRoutes = require('./api/Routes/users.routes');
const nguoidungsRoutes = require('./api/Routes/nguoidungs.routes');
const nguoinuocngoaisRoutes = require('./api/Routes/nguoinuocngoais.routes');
const luutrusRoutes = require('./api/Routes/luutrus.routes');
const chitietluutrusRoutes = require('./api/Routes/chitietluutrus.routes');
let app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = 3000

// let port = process.env.PORT || 3000


// routes
usersRoutes(app)
nguoidungsRoutes(app)
nguoinuocngoaisRoutes(app)
luutrusRoutes(app)
chitietluutrusRoutes(app)


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