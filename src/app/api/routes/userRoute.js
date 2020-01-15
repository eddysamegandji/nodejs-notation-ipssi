const user = require('../controllers/userController');

module.exports = (app) => {
    app.route('/auth/register')
    .post(user.register);

    app.route('/auth/sign_in')
    .post(user.sign_in);

    app.route('/users')
    .get(user.get_all);
}