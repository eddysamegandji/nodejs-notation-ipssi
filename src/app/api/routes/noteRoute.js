const noteController = require('../controllers/noteController');

const userHandlers = require('../controllers/userController.js');

module.exports = (app) => {
  app.route('/note')
  .get(userHandlers.adminRequired, noteController.list_all_note)
  .post(userHandlers.studentRequired, noteController.create_a_note)

  app.route('/sessions/:session_id')
  .get(userHandlers.adminRequired, noteController.get_a_note)
}