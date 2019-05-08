const router = require('express-promise-router')();
const controller = require('../controllers/ninjas');

// get a list of ninjas from the db
router.get('/', controller.getNinjas);

// add a ninja to the db
router.post('/', controller.addNinja);

// get a ninja from the db
router.get('/:id', controller.getNinja);

// update a ninja in the db
router.patch('/:id', controller.updateNinja);

// delete a ninja from the db
router.delete('/:id', controller.deleteNinja);

module.exports = router;
