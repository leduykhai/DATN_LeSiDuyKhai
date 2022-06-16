module.exports = function (app) {
    let csltsCtrl = require('../../Controllers/CoSoLuuTrusControllers/cosoluutrusControllers')

    //CSLT
    app.route('/cslts')
        .get(csltsCtrl.get)
        .post(csltsCtrl.addNewCSLT)
        .put(csltsCtrl.updateCSLT)
        .delete(csltsCtrl.deleteCSLTByAll);

    app.route('/csltsmaxid')
        .get(csltsCtrl.getCSLTByMaxId)

    app.route('/cslts/:id')
        .get(csltsCtrl.getCSLTById)
        .delete(csltsCtrl.deleteCSLTById);

    app.route('/ccslts/:id')
        .get(csltsCtrl.getCSLTByCCsltId);

    app.route('/csltsphuong/:id')
        .get(csltsCtrl.getCSLTByPhuongId);
}