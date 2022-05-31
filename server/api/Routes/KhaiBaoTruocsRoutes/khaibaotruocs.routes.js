module.exports = function (app) {
    let khaibaotruocsCtrl = require('../../Controllers/KhaiBaoTruocsControllers/khaibaotruocsControllers')

    //KhaiBaoTruoc
    app.route('/khaibaotruocs')
        .get(khaibaotruocsCtrl.get)
        .post(khaibaotruocsCtrl.addNewKhaiBaoTruoc)
        .put(khaibaotruocsCtrl.updateKhaiBaoTruoc)
        .delete(khaibaotruocsCtrl.deleteKhaiBaoTruocByAll);

    app.route('/khaibaotruocs/:id')
        .get(khaibaotruocsCtrl.getKhaiBaoTruocById)
        .delete(khaibaotruocsCtrl.deleteKhaiBaoTruocById);

}