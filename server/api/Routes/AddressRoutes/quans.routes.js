module.exports = function (app) {
    let quansCtrl = require('../../Controllers/AddressControllers/quansControllers')

    //Quan
    app.route('/quans')
        .get(quansCtrl.get)
        .post(quansCtrl.addNewQuan)
        .put(quansCtrl.updateQuan)
        .delete(quansCtrl.deleteQuanByAll);

    app.route('/quans/:id')
        .get(quansCtrl.getQuanById)
        .get(quansCtrl.getQuanByTPId)
        .delete(quansCtrl.deleteQuanById);

}