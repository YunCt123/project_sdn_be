const express = require('express');
const accountRouter = express.Router();
const accountController = require('../controllers/accountController');

// Account routes
accountRouter.post('/', accountController.createAccount);
accountRouter.get('/', accountController.getAllAccounts);
accountRouter.get('/:id', accountController.getAccountById);
accountRouter.put('/:id', accountController.updateAccount);
accountRouter.delete('/:id', accountController.deleteAccount);

module.exports = accountRouter;
