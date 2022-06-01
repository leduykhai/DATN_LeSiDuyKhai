module.exports = function (app) {
    let userroleCtrl = require('../../Controllers/UsersControllers/users_rolesControllers')

    //UsersRole
    app.route('/userrole')
        .get(userroleCtrl.get)
        .post(userroleCtrl.addNewUsersRole)
        .put(userroleCtrl.updateUsersRole)
        .delete(userroleCtrl.deleteUsersRoleByAll);

    app.route('/userrole/:id')
        .get(userroleCtrl.getUsersRoleById)
        .delete(userroleCtrl.deleteUsersRoleById);

}