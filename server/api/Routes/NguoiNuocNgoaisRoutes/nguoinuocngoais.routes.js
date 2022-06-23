module.exports = function (app) {
    let nguoinuocngoaisCtrl = require('../../Controllers/NguoiNuocNgoaisControllers/nguoinuocngoaisControllers')

    //NNN
    app.route('/nguoinuocngoais')
        .get(nguoinuocngoaisCtrl.get)
        .post(nguoinuocngoaisCtrl.addNewNNN)
        .put(nguoinuocngoaisCtrl.updateNNN)
        .delete(nguoinuocngoaisCtrl.deleteNNNByAll);

    app.route('/nguoinuocngoais/:id')
        .get(nguoinuocngoaisCtrl.getNNNById)
        .delete(nguoinuocngoaisCtrl.deleteNNNById);

    app.route('/nguoinuocngoaiscslt/:id')
        .get(nguoinuocngoaisCtrl.getNNNByCsltId);

    app.route('/nguoinuocngoaisuser/:id')
        .get(nguoinuocngoaisCtrl.getNNNByUserId);

    app.route('/nguoinuocngoaisuserone/:id')
        .get(nguoinuocngoaisCtrl.getNNNByUserIdOne);


    // app.route('/api/nguoinuocngoais/login')
    //     .post(nguoinuocngoaisCtrl.login)

}