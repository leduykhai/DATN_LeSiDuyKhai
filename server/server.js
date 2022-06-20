let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
require("dotenv").config();
let db = require('./api/Config/database');

const usersRoutes = require('./api/Routes/UsersRoutes/users.routes');
const usersStatusRoutes = require('./api/Routes/UsersRoutes/users_status.routes');
const usersRoleRoutes = require('./api/Routes/UsersRoutes/users_roles.routes');

const nhanviensRoutes = require('./api/Routes/NhanViensRoutes/nhanviens.routes');
const khuvucsRoutes = require('./api/Routes/NhanViensRoutes/khuvucs.routes');
const tintucsRoutes = require('./api/Routes/NhanViensRoutes/tintucs.routes');

const chu_csltsRoutes = require('./api/Routes/CoSoluuTrusRoutes/chucosoluutrus.routes');
const csltsRoutes = require('./api/Routes/CoSoluuTrusRoutes/cosoluutrus.routes');
const ct_csltsRoutes = require('./api/Routes/CoSoluuTrusRoutes/chitietcosoluutrus.routes');

const nguoinuocngoaisRoutes = require('./api/Routes/NguoiNuocNgoaisRoutes/nguoinuocngoais.routes');
const nhatkyluutrusRoutes = require('./api/Routes/NguoiNuocNgoaisRoutes/nhatkyluutrus.routes');
const danhgiasRoutes = require('./api/Routes/NguoiNuocNgoaisRoutes/danhgias.routes');
const phanhoidgsRoutes = require('./api/Routes/NguoiNuocNgoaisRoutes/phanhoidanhgias.routes');

const luutrustatusRoutes = require('./api/Routes/LuuTrusRoutes/luutru_status.routes');
const luutrusRoutes = require('./api/Routes/LuuTrusRoutes/luutrus.routes');

const khaibaotruocsRoutes = require('./api/Routes/KhaiBaoTruocsRoutes/khaibaotruocs.routes');
const khaibaotruocstatusRoutes = require('./api/Routes/KhaiBaoTruocsRoutes/khaibaotruoc_status.routes');

const phuongsRoutes = require('./api/Routes/AddressRoutes/phuongs.routes');
const quansRoutes = require('./api/Routes/AddressRoutes/quans.routes');
const thanhphosRoutes = require('./api/Routes/AddressRoutes/thanhphos.routes');
const quoctichsRoutes = require('./api/Routes/AddressRoutes/quoctichs.routes');


let app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = 3000

// let port = process.env.PORT || 3000


// routes
usersRoutes(app)
usersStatusRoutes(app)
usersRoleRoutes(app)

nhanviensRoutes(app)
khuvucsRoutes(app)
tintucsRoutes(app)

chu_csltsRoutes(app)
csltsRoutes(app)
ct_csltsRoutes(app)

nguoinuocngoaisRoutes(app)
nhatkyluutrusRoutes(app)
danhgiasRoutes(app)
phanhoidgsRoutes(app)

luutrustatusRoutes(app)
luutrusRoutes(app)

khaibaotruocsRoutes(app)
khaibaotruocstatusRoutes(app)

phuongsRoutes(app)
quansRoutes(app)
thanhphosRoutes(app)
quoctichsRoutes(app)

//static Images Folder

app.use('/Images', express.static('./Images'))


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