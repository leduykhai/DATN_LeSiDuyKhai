module.exports = function (app) {
    let quoctichsCtrl = require('../../Controllers/AddressControllers/quoctichsControllers')

    //QuocTich
    app.route('/quoctichs')
        .get(quoctichsCtrl.get)
        .post(quoctichsCtrl.addNewQuocTich)
        .put(quoctichsCtrl.updateQuocTich)
        .delete(quoctichsCtrl.deleteQuocTichByAll);

    app.route('/quoctichs/:id')
        .get(quoctichsCtrl.getQuocTichById)
        .delete(quoctichsCtrl.deleteQuocTichById);

}