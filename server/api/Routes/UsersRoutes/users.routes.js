module.exports = function (app) {
    let usersCtrl = require('../../Controllers/UsersControllers/usersControllers')
    // const { checkToken } = require("../../auth/token_validation");


    //Users
    app.route('/users')
        .get(usersCtrl.get)
        .post(usersCtrl.addNewUser)
        .put(usersCtrl.updateUser)
        .delete(usersCtrl.deleteUserByAll);

    app.route('/usersccslt')
        .get(usersCtrl.getAccC);

    app.route('/usersnnn')
        .get(usersCtrl.getAccN);

    app.route('/usersidmax')
        .get(usersCtrl.getUserByIdMax);

    app.route('/usersmail/:id')
        .get(usersCtrl.getUserByEmail);

    app.route('/users/:id')
        .get(usersCtrl.getUserById)
        .delete(usersCtrl.deleteUserById);

    app.route('/api/users/login')
        .post(usersCtrl.login)
}