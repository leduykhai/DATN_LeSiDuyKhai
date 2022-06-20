module.exports = function (app) {
    let khaibaotruocsCtrl = require('../../Controllers/KhaiBaoTruocsControllers/khaibaotruocsControllers')

    //KhaiBaoTruoc
    app.route('/khaibaotruocs')
        .get(khaibaotruocsCtrl.get)
        .post(khaibaotruocsCtrl.upload, khaibaotruocsCtrl.addNewKhaiBaoTruoc)
        .put(khaibaotruocsCtrl.updateKhaiBaoTruoc)
        .delete(khaibaotruocsCtrl.deleteKhaiBaoTruocByAll);

    app.route('/khaibaotruocs/:id')
        .get(khaibaotruocsCtrl.getKhaiBaoTruocById)
        .delete(khaibaotruocsCtrl.deleteKhaiBaoTruocById);

    app.route('/khaibaotruocscslt/:id')
        .get(khaibaotruocsCtrl.getKhaiBaoTruocByCSLTId);

}