let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let db = require('./api/Config/database');
const usersRoutes = require('./api/Routes/users.routes');
const nhanviensRoutes = require('./api/Routes/nhanviens.routes');
const chucosoluutrusRoutes = require('./api/Routes/chucosoluutrus.routes');
const nguoinuocngoaisRoutes = require('./api/Routes/nguoinuocngoais.routes');
const luutrusRoutes = require('./api/Routes/luutrus.routes');
const nhatkyluutrusRoutes = require('./api/Routes/nhatkyluutrus.routes');
const khuvucsRoutes = require('./api/Routes/khuvucs.routes');
const tintucsRoutes = require('./api/Routes/tintucs.routes');
const csltsRoutes = require('./api/Routes/cosoluutrus.routes');
const ct_csltsRoutes = require('./api/Routes/chitietcosoluutrus.routes');
const danhgiasRoutes = require('./api/Routes/danhgias.routes');
const phanhoi_dgsRoutes = require('./api/Routes/phanhoidanhgias.routes');
const khaibaotruocsRoutes = require('./api/Routes/khaibaotruocs.routes');
let app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = 3000

// let port = process.env.PORT || 3000


// routes
usersRoutes(app)
nhanviensRoutes(app)
chucosoluutrusRoutes(app)
nguoinuocngoaisRoutes(app)
luutrusRoutes(app)
nhatkyluutrusRoutes(app)
khuvucsRoutes(app)
tintucsRoutes(app)
csltsRoutes(app)
ct_csltsRoutes(app)
danhgiasRoutes(app)
phanhoi_dgsRoutes(app)
khaibaotruocsRoutes(app)


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