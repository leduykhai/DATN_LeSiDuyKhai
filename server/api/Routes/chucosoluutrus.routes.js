module.exports = function (app) {
    let chucosoluutrusCtrl = require('../Controllers/chucosoluutrusControllers')

    //Chu Co So Luu Tru
    app.route('/chucosoluutrus')
        .get(chucosoluutrusCtrl.get)
        .post(chucosoluutrusCtrl.addNewChuCSLT)
        .put(chucosoluutrusCtrl.updateChuCSLT)
        .delete(chucosoluutrusCtrl.deleteChuCSLTByAll);

    app.route('/chucosoluutrus/:id')
        .get(chucosoluutrusCtrl.getChuCSLTById)
        .delete(chucosoluutrusCtrl.deleteChuCSLTById);

    // app.route('/api/chucosoluutrus/login')
    //     .post(chucosoluutrusCtrl.login)

}