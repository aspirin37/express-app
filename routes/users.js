const router = require('express-promise-router')();

const controller = require('../controllers/users');
const checkAuth = require('../middleware/checkAuth');
const checkRights = require('../middleware/checkRights');

// get a list of users from the db
router.get('/', checkAuth, controller.getUsers);

// add a user to the db
router.post('/sign-up', controller.signUp);

// sign in user
router.post('/sign-in', controller.signIn);

// get a user from the db
router.get('/:id', checkAuth, controller.getUser);

// update a user in the db
router.patch('/:id', checkAuth, checkRights, controller.updateUser);

// delete a user from the db
router.delete('/:id', checkAuth, checkRights, controller.deleteUser);

module.exports = router;
