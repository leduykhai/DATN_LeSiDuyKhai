module.exports = function (app) {
    let danhgiasCtrl = require('../../Controllers/NguoiNuocNgoaisControllers/danhgiasControllers')

    //DanhGia
    app.route('/danhgias')
        .get(danhgiasCtrl.get)
        .post(danhgiasCtrl.addNewDanhGia)
        .put(danhgiasCtrl.updateDanhGia)
        .delete(danhgiasCtrl.deleteDanhGiaByAll);

    app.route('/danhgias/:id')
        .get(danhgiasCtrl.getDanhGiaById)
        .delete(danhgiasCtrl.deleteDanhGiaById);
    app.route('/danhgiascslt/:id')
        .get(danhgiasCtrl.getDanhGiaByCsltId)

}
