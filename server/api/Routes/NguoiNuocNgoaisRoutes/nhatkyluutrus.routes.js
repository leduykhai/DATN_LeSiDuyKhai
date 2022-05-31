module.exports = function (app) {
    let nhatkyluutrusCtrl = require('../../Controllers/NguoiNuocNgoaisControllers/nhatkyluutrusControllers')

    //NhatKyLuuTru
    app.route('/nhatkyluutrus')
        .get(nhatkyluutrusCtrl.get)
        .post(nhatkyluutrusCtrl.addNewNhatKyLuuTru)
        .put(nhatkyluutrusCtrl.updateNhatKyLuuTru)
        .delete(nhatkyluutrusCtrl.deleteNhatKyLuuTruByAll);

    app.route('/nhatkyluutrus/:id')
        .get(nhatkyluutrusCtrl.getNhatKyLuuTruById)
        .delete(nhatkyluutrusCtrl.deleteNhatKyLuuTruById);

}