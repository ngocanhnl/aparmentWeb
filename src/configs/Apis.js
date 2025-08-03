import axios from "axios";
import cookie from 'react-cookies'

// const BASE_URL = 'http://localhost:8080/ApartManagement/api';
const BASE_URL = 'http://localhost:8080/ApartManagement/api/';

export const endpoints = {
    'categories': '/categories',
    'products': '/products',
    'register': '/users',
    'login': '/login',
    'profile': '/secure/profile',
    'updateProfile': '/secure/update',
    'change-password': '/secure/changePassword',
    'invoiceList': '/secure/invoices',
    'updateImageBill': '/secure/updateBill',
    'complaints': '/secure/complaints',
    'my-locker': '/secure/MyLocker',
}

export const authApis = () => axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': `Bearer ${cookie.load('token')}`
    }
})

export default axios.create({
    baseURL: BASE_URL
})