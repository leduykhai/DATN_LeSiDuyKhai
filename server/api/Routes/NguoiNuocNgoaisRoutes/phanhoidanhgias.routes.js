module.exports = function (app) {
    let phanhoi_dgsCtrl = require('../Controllers/phanhoidanhgiasControllers')

    //PhanHoiDG
    app.route('/phanhoi_dgs')
        .get(phanhoi_dgsCtrl.get)
        .post(phanhoi_dgsCtrl.addNewPhanHoiDG)
        .put(phanhoi_dgsCtrl.updatePhanHoiDG)
        .delete(phanhoi_dgsCtrl.deletePhanHoiDGByAll);

    app.route('/phanhoi_dgs/:id')
        .get(phanhoi_dgsCtrl.getPhanHoiDGById)
        .delete(phanhoi_dgsCtrl.deletePhanHoiDGById);

}