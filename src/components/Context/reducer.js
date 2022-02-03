import React, { useReducer } from 'react'
import { decrypt } from '../Axios/axios'

let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).user
  : ''
let token = localStorage.getItem('a-t')
  ? decrypt(localStorage.getItem('a-t'))
  : ''

export const initialState = {
  userDetails: '' || user,
  token: '' || token,
  loading: false,
  errorMessage: null,
  isAuthenticated: false,
}

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        token: '',
        isAuthenticated: false,
      }

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
