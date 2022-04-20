module.exports = function (app) {
    let chitietluutrusCtrl = require('../Controllers/chitietluutrusControllers')

    //ChiTietLuuTru
    app.route('/luutrus')
        .get(chitietluutrusCtrl.get)
        .post(chitietluutrusCtrl.addNewChiTietLuuTru)
        .put(chitietluutrusCtrl.updateChiTietLuuTru)
        .delete(chitietluutrusCtrl.deleteChiTietLuuTruByAll);

    app.route('/luutrus/:ma_chi_tiet_lt')
        .get(chitietluutrusCtrl.getChiTietLuuTruById)
        .delete(chitietluutrusCtrl.deleteChiTietLuuTruById);

}