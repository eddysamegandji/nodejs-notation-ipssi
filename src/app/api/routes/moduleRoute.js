const moduleController = require('../controllers/moduleController');
const userHandlers = require('../controllers/userController.js');

module.exports = (app) => {
    app.route('/module')
    .post(userHandlers.adminRequired,moduleController.add_module)
    .get(userHandlers.adminRequired,moduleController.list_all_modules);
    
    app.route('/module/:module_id')
    .get(userHandlers.adminRequired,moduleController.get_a_module)
    .put(userHandlers.adminRequired,moduleController.update_a_module)
    .delete(userHandlers.adminRequired,moduleController.delete_a_module);
}

