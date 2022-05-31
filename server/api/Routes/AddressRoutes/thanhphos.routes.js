module.exports = function (app) {
    let thanhphosCtrl = require('../../Controllers/AddressControllers/thanhphosControllers')


    //ThanhPho
    app.route('/thanhphos')
        .get(thanhphosCtrl.get)
        .post(thanhphosCtrl.addNewThanhPho)
        .put(thanhphosCtrl.updateThanhPho)
        .delete(thanhphosCtrl.deleteThanhPhoByAll);

    app.route('/thanhphos/:id')
        .get(thanhphosCtrl.getThanhPhoById)
        .delete(thanhphosCtrl.deleteThanhPhoById);

}