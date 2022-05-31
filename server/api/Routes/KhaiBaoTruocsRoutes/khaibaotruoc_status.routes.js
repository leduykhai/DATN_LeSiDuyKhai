module.exports = function (app) {
    let kbtstatusCtrl = require('../../Controllers/KhaiBaoTruocsControllers/khaibaotruoc_statusControllers')

    //KBTStatus
    app.route('/kbtstatus')
        .get(kbtstatusCtrl.get)
        .post(kbtstatusCtrl.addNewKBTStatus)
        .put(kbtstatusCtrl.updateKBTStatus)
        .delete(kbtstatusCtrl.deleteKBTStatusByAll);

    app.route('/kbtstatus/:id')
        .get(kbtstatusCtrl.getKBTStatusById)
        .delete(kbtstatusCtrl.deleteKBTStatusById);

}