const user = require('../controllers/userController');
const userHandlers = require('../controllers/userController.js');

module.exports = (app) => {
    app.route('/auth/register')
    .post(user.register);

    app.route('/auth/sign_in')
    .post(user.sign_in);

    app.route('/users')
    .get(user.get_all);

    app.route('/intervenant')
    .get(userHandlers.adminRequired, user.get_all_intervenant);
    
    app.route('/users/:id')
    .put(userHandlers.adminRequired, user.modify_user)
    .delete(userHandlers.adminRequired, user.delete_user)
}