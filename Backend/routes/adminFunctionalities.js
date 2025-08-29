const express = require('express');
const adminRouter = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const {register, getProfile, forgotPassword, resetPassword, updateProfile} = require('../controllers/userAuthenticationFunctions');
const {adminRegister, adminRechargeWallet, getAllUsers, adminLogout, getAdminProfile, getTripAnalytics} = require('../controllers/adminFunctionalitiesImplement');

adminRouter.post('/registerAdmin', adminMiddleware, adminRegister);
adminRouter.post('/registerUser', adminMiddleware, register);
adminRouter.post('/recharge', adminMiddleware, adminRechargeWallet);
adminRouter.get('/adminProfile', getAdminProfile);
adminRouter.get('/getAllUsers', adminMiddleware, getAllUsers);
adminRouter.post('/logout', adminMiddleware, adminLogout);
adminRouter.get('/getProfile', getProfile);
adminRouter.post('/forgotPassword', forgotPassword);
adminRouter.post('/resetPassword', resetPassword);
adminRouter.patch('/updateProfile', updateProfile);
adminRouter.get('/tripAnalytics', getTripAnalytics);

module.exports = adminRouter;
