module.exports = function (app) {
    let nhanviensCtrl = require('../../Controllers/NhanViensControllers/nhanviensControllers')

    //NhanViens
    app.route('/nhanviens')
        .get(nhanviensCtrl.get)
        .post(nhanviensCtrl.addNewNhanVien)
        .put(nhanviensCtrl.updateNhanVien)
        .delete(nhanviensCtrl.deleteNhanVienByAll);

    app.route('/nhanviensuser/:id')
        .get(nhanviensCtrl.getNhanVienByUserId)

    app.route('/nhanviens/:id')
        .get(nhanviensCtrl.getNhanVienById)
        .delete(nhanviensCtrl.deleteNhanVienById);

    // app.route('/api/nhanviens/login')
    //     .post(nhanviensCtrl.login)

}