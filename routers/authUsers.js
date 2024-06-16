const express = require('express');
const app = express.Router();
const usersController = require('../controllers/usersController');
const middlewares = require('../middlewares/middlewares');



app.get('/dashboard',[middlewares.check_auth_users,usersController.dashboard]);
app.get('/logout',[middlewares.check_auth_users,usersController.logout]);

module.exports = app;