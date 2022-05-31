module.exports = function (app) {
    let nguoinuocngoaisCtrl = require('../../Controllers/NguoiNuocNgoaisControllers/nguoinuocngoaisControllers')

    //NguoiNuocNgoai
    app.route('/nguoinuocngoais')
        .get(nguoinuocngoaisCtrl.get)
        .post(nguoinuocngoaisCtrl.addNewNguoiNuocNgoai)
        .put(nguoinuocngoaisCtrl.updateNguoiNuocNgoai)
        .delete(nguoinuocngoaisCtrl.deleteNguoiNuocNgoaiByAll);

    app.route('/nguoinuocngoais/:id')
        .get(nguoinuocngoaisCtrl.getNguoiNuocNgoaiById)
        .delete(nguoinuocngoaisCtrl.deleteNguoiNuocNgoaiById);

    // app.route('/api/nguoinuocngoais/login')
    //     .post(nguoinuocngoaisCtrl.login)

}