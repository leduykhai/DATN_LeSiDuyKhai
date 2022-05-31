module.exports = function (app) {
    let ltstatusCtrl = require('../../Controllers/LuutrusControllers/luutru_statusControllers')

    //LTStatus
    app.route('/ltstatus')
        .get(ltstatusCtrl.get)
        .post(ltstatusCtrl.addNewLTStatus)
        .put(ltstatusCtrl.updateLTStatus)
        .delete(ltstatusCtrl.deleteLTStatusByAll);

    app.route('/ltstatus/:id')
        .get(ltstatusCtrl.getLTStatusById)
        .delete(ltstatusCtrl.deleteLTStatusById);

}