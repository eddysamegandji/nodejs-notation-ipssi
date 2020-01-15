const module = require('../controllers/moduleController');

module.exports = (app) => {
    app.route('/module/ajout')
    .post(module.add_module);

    app.route('/module/:intervenant_id/modules')
    .get(module.list_all_modules);
    
    app.route('/module/:module_name/modules')
    .get(module.get_a_module)
    .put(module.update_a_module)
    .delete(module.delete_a_module);
}

