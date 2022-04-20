module.exports = function (app) {
    let luutrusCtrl = require('../Controllers/luutrusControllers')

    //LuuTru
    app.route('/luutrus')
        .get(luutrusCtrl.get)
        .post(luutrusCtrl.addNewLuuTru)
        .put(luutrusCtrl.updateLuuTru)
        .delete(luutrusCtrl.deleteLuuTruByAll);

    app.route('/luutrus/:ma_lt')
        .get(luutrusCtrl.getLuuTruById)
        .delete(luutrusCtrl.deleteLuuTruById);

}