module.exports = function (app) {
    let ct_csltsCtrl = require('../Controllers/chitietcsltControllers')

    //CHITIETCSLT
    app.route('/ct_cslts')
        .get(ct_csltsCtrl.get)
        .post(ct_csltsCtrl.addNewCHITIETCSLT)
        .put(ct_csltsCtrl.updateCHITIETCSLT)
        .delete(ct_csltsCtrl.deleteCHITIETCSLTByAll);

    app.route('/ct_cslts/:id')
        .get(ct_csltsCtrl.getCHITIETCSLTById)
        .delete(ct_csltsCtrl.deleteCHITIETCSLTById);

}