module.exports = function (app) {
    let nguoidungsCtrl = require('../Controllers/nguoidungsControllers')

    //NguoiDungs
    app.route('/nguoidungs')
        .get(nguoidungsCtrl.get)
        .post(nguoidungsCtrl.addNewNguoiDung)
        .put(nguoidungsCtrl.updateNguoiDung)
        .delete(nguoidungsCtrl.deleteNguoiDungByAll);

    app.route('/nguoidungs/:ma_tknd')
        .get(nguoidungsCtrl.getNguoiDungById)
        .delete(nguoidungsCtrl.deleteNguoiDungById);

    app.route('/api/nguoidungs/login')
        .post(nguoidungsCtrl.login)

}