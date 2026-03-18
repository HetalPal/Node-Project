const express = require('express');
const {login,home,dashboard,myProfile,changePasswordPage,logOutAdmin,changePassword,forgotPasswordPage,verifyOtpPage,sendOtp,verifyOtp} = require('../controllers/index.controller');
const routes = express.Router();
const passport = require('passport');

routes.get("/", home);
routes.post("/login",passport.authenticate("local", {failureRedirect: "/"}),login);
routes.get("/dashboard", dashboard);
routes.get("/myProfile",myProfile);
routes.get("/logout",logOutAdmin);
routes.post("/changePassword",changePassword);

routes.use("/admin", require("./admin.routes"));

routes.get("/changePassword", changePasswordPage);
routes.get('/forgotpassword', forgotPasswordPage);
routes.post('/sendotp', sendOtp);
routes.get('/verifyotp', verifyOtpPage);
routes.post('/verifyotp', verifyOtp);

routes.use('/category', require('./category.routes'));
routes.use('/subcategory', require('./subCategory.routes'))
routes.use('/extracategory', require('./extraCatgory.routes'));
routes.use('/product',require('./product.routes'))

module.exports = routes;