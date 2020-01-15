const sessionController = require('../controllers/sessionController');

const userHandlers = require('../controllers/userController.js');

module.exports = (app) => {
  app.route('/sessions')
  .get(userHandlers.adminRequired, sessionController.list_all_session)
  .post(userHandlers.adminRequired, sessionController.create_a_session)

  app.route('/sessions/:session_id')
  .get(userHandlers.adminRequired, sessionController.get_a_session)
  .put(userHandlers.adminRequired, sessionController.update_a_session)
  .delete(userHandlers.adminRequired, sessionController.delete_a_session)
}