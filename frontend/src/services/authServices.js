import API from '../api';

// AUTHENTICATION
export const registerUser = (data)=> {
    return API.post('/user/register', data)
}
export const loginUser = (data)=> {
    return API.post('/user/login', data);
}
export const logoutAdmin = ()=> {
    return API.post('/admin/logout');
}
export const logoutUser = ()=> {
    return API.post('/user/logout');
}
// GET PROFILE
export const adminProfile = ()=> {
    return API.get('/admin/adminProfile');
}
export const userProfile = ()=> {
    return API.get('/user/getProfile');
}
export const updateProfileAdmin = (data)=> {
    return API.patch('/admin/updateProfile', data);
}
// ROUTES FUNCTIONALITIES
export const addRoute = (data)=> {
    return API.post('/route/add', data);
}
export const getRoutes = ()=> {
    return API.get('/route/getAllRoute');
}
export const getRouteById = (id)=> {
    return API.get(`/route/getRoute/${id}`);
}
export const updateRoute = (id, data)=> {
    return API.patch(`/route/update/${id}`, data);
}
export const deleteRoute = (id)=> {
    return API.delete(`/route/delete/${id}`);
}
// SHUTTLE FUNCTIONALITIES
export const addShuttle = (data)=> {
   return API.post('/shuttle/add', data);
}
export const getShuttle = ()=> {
   return API.get('/shuttle/get');
}
export const getShuttleById = (id)=> {
   return API.get(`/shuttle/get/${id}`);
}
export const updateShuttle = (id, data)=> {
   return API.patch(`/shuttle/update/${id}`, data)
}
export const deleteShuttle = (id)=> {
   return API.delete(`/shuttle/delete/${id}`);
}
export const updateStatus = (id, data)=> {
   return API.patch(`/shuttle/updateStatus/${id}`, data);
}
//VIEW USERS
export const viewUsers = (data)=> {
    return API.get('/admin/getAllUsers', data);
}
//ADMIN RECHARGE WALLET
export const rechargeAdmin = (data)=> {
    return API.post('/admin/recharge', data)
}
// USER RECHARGE WALLET
export const rechargeUser = (data)=> {
    return API.post('/user/recharge', data);
}
// USER TRIP BOOKING FUNCTIONALITIES
export const bookMyTrip = (data)=> {
    return API.post('/booking/book', data)
};
export const getAllTrips = ()=> {
    return API.get('/booking/getTrips');
}
export const cancelTrip = (id)=> {
    return API.put(`/booking/cancel/${id}`);
}
export const getTripHistory = ()=> {
    return API.get('/booking/tripHistory');
}
export const checkAvailability = (data)=> {
    return API.post('/booking/availability', data);
}
// GET TRIP ANALYTICS
export const getTripAnalytics = ()=> {
    return API.get('/admin/tripAnalytics');
}