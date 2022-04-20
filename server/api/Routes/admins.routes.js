module.exports = function (app) {
    let adminsCtrl = require('../Controllers/adminsControllers')

    //Admins
    app.route('/admins')
        .get(adminsCtrl.get)
        .post(adminsCtrl.addNewAdmin)
        .put(adminsCtrl.updateAdmin)
        .delete(adminsCtrl.deleteAdminByAll);

    app.route('/admins/:id')
        .get(adminsCtrl.getAdminById)
        .delete(adminsCtrl.deleteAdminById);

    app.route('/api/admins/login')
        .post(adminsCtrl.login)

}