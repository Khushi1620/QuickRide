const express = require('express');
const routeRouter = express.Router();
const {addRoute, getAllRoutes, getRouteById, updateRouteById, deleteRouteById} = require('../controllers/routeFunctionalitiesImplementation');
const adminMiddleware = require('../middleware/adminMiddleware');

// admin middleware
routeRouter.post('/add', addRoute);
routeRouter.get('/getAllRoute', getAllRoutes);
routeRouter.get('/getRoute/:id', getRouteById);
// admin middleware
routeRouter.patch('/update/:id', updateRouteById);
// admin middleware
routeRouter.delete('/delete/:id', deleteRouteById);
module.exports = routeRouter;