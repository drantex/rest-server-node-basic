const { Router } = require('express'); 
const { 
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios } = require('../controllers/usuarios.controller');
const router = Router();

router.get('/', getUsuarios);
router.put('/:id', putUsuarios);
router.delete('/', deleteUsuarios);
router.post('/', postUsuarios);

module.exports = router;