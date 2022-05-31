module.exports = function (app) {
    let khuvucsCtrl = require('../Controllers/khuvucsControllers')

    //KhuVuc
    app.route('/khuvucs')
        .get(khuvucsCtrl.get)
        .post(khuvucsCtrl.addNewKhuVuc)
        .put(khuvucsCtrl.updateKhuVuc)
        .delete(khuvucsCtrl.deleteKhuVucByAll);

    app.route('/khuvucs/:id')
        .get(khuvucsCtrl.getKhuVucById)
        .delete(khuvucsCtrl.deleteKhuVucById);

}