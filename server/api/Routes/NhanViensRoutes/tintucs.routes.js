module.exports = function (app) {
    let tintucsCtrl = require('../../Controllers/NhanViensControllers/tintucsControllers')

    //TinTuc
    app.route('/tintucs')
        .get(tintucsCtrl.get)
        .post(tintucsCtrl.addNewTinTuc)
        .put(tintucsCtrl.updateTinTuc)
        .delete(tintucsCtrl.deleteTinTucByAll);

    app.route('/tintucs/:id')
        .get(tintucsCtrl.getTinTucById)
        .delete(tintucsCtrl.deleteTinTucById);

}