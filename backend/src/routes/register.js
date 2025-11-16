const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// Use /register/:type where type is empresas|funcionarios|representantes|filiais
router.post('/:type', async (req, res, next) => {
  try {
    const { type } = req.params;
    if (!['empresas','funcionarios','representantes','filiais'].includes(type)) {
      return res.status(400).json({ message: 'Tipo inválido' });
    }
    await registerController.register(type, req, res, next);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
