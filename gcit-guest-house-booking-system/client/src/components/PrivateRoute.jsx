// import { Navigate } from "react-router-dom";
// export default function PrivateRoute({ children }) {
// const token = localStorage.getItem("token");
// return token ? children : <Navigate to="/signin" />;
// }
// client/src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
export default function PrivateRoute({ children, allowedRole }) {
const token = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');
 let userRole = localStorage.getItem('role');
if (!userRole && storedUser) {
 try {
 userRole = JSON.parse(storedUser)?.role;
 } catch (e) {
 console.error('Error parsing stored user:', e);
 }
}
// 1. If not authenticated at all -> Redirect to Sign In
if (!token) {
 return <Navigate to="/signin" replace />;
}
// 2. If route requires 'admin' but user is 'guest' -> Redirect to Guest Dashboard
if (allowedRole && userRole !== allowedRole) {
 return <Navigate to="/dashboard" replace />;
}
// 3. Authenticated and authorized -> Render target page
return children;
}