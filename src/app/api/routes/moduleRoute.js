const moduleController = require('../controllers/moduleController');
const userHandlers = require('../controllers/userController.js');

module.exports = (app) => {
    app.route('/module/ajout')
    .post(userhandlers.adminRequired,moduleController.add_module);

    app.route('/module')
    .get(userhandlers.adminRequired,moduleController.list_all_modules);
    
    app.route('/module/:module_name')
    .get(userhandlers.adminRequired,moduleController.get_a_module)
    .put(userhandlers.adminRequired,moduleController.update_a_module)
    .delete(userhandlers.adminRequired,moduleController.delete_a_module);
}

