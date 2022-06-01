module.exports = function (app) {
    let userstatusCtrl = require('../../Controllers/UsersControllers/users_statusControllers')

    //UserStatus
    app.route('/userstatus')
        .get(userstatusCtrl.get)
        .post(userstatusCtrl.addNewUserStatus)
        .put(userstatusCtrl.updateUserStatus)
        .delete(userstatusCtrl.deleteUserStatusByAll);

    app.route('/userstatus/:ma_lt')
        .get(userstatusCtrl.getUserStatusById)
        .delete(userstatusCtrl.deleteUserStatusById);

}