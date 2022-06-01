module.exports = function (app) {
    let usersCtrl = require('../../Controllers/UsersControllers/usersControllers')

    //Users
    app.route('/users')
        .get(usersCtrl.get)
        .post(usersCtrl.addNewUser)
        .put(usersCtrl.updateUser)
        .delete(usersCtrl.deleteUserByAll);

    app.route('/users/:id')
        .get(usersCtrl.getUserById)
        .delete(usersCtrl.deleteUserById);

    app.route('/api/users/login')
        .post(usersCtrl.login)
}