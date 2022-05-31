module.exports = function (app) {
    let luutrusCtrl = require('../../Controllers/LuutrusControllers/luutrusControllers')

    //LuuTru
    app.route('/luutrus')
        .get(luutrusCtrl.get)
        .post(luutrusCtrl.addNewLuuTru)
        .put(luutrusCtrl.updateLuuTru)
        .delete(luutrusCtrl.deleteLuuTruByAll);

    app.route('/luutrus/:id')
        .get(luutrusCtrl.getLuuTruById)
        .delete(luutrusCtrl.deleteLuuTruById);

}