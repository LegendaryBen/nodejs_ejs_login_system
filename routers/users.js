const express = require("express");
const app = express.Router();
const usersController = require("../controllers/usersController");
const middlewares = require('../middlewares/middlewares');



app.route('/sign-up').get(
    [middlewares.check_guest_users,usersController.sign_up_get]
).post(
    [middlewares.check_guest_users,usersController.sign_up_post]
)


app.route('/login').get(
    [middlewares.check_guest_users,usersController.login_get]
).post(
    [middlewares.check_guest_users,usersController.login_post]
)


module.exports = app;