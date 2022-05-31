module.exports = function (app) {
    let phuongsCtrl = require('../../Controllers/AddressControllers/phuongsControllers')

    //Phuong
    app.route('/phuongs')
        .get(phuongsCtrl.get)
        .post(phuongsCtrl.addNewPhuong)
        .put(phuongsCtrl.updatePhuong)
        .delete(phuongsCtrl.deletePhuongByAll);

    app.route('/phuongs/:id')
        .get(phuongsCtrl.getPhuongById)
        .delete(phuongsCtrl.deletePhuongById);

}