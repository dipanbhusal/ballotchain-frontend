import { useHistory } from 'react-router-dom'
import axios from '../Axios/axios'
import { encrypt } from '../Axios/axios'
import urls from '../Axios/urls'

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: loginPayload,
  }
  // try {

  dispatch({ type: 'REQUEST_LOGIN' })
  await axios({
    url: urls.LOGIN,
    ...requestOptions,
  })
    .then((response) => {
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
      let access = encrypt(response.data.details.token.access)
      let refresh = encrypt(response.data.details.token.access)
      let user = response.data.details.user

      console.log(response.data)
      localStorage.setItem('currentUser', JSON.stringify(user))
      localStorage.setItem('a-t', access.toString())
      axios.defaults.headers['Authorization'] =
        'Bearer ' + response.data.details.token.access

      return response.data
    })
    .catch((error) => {
      console.log(error.response.data)
      dispatch({ type: 'LOGIN_ERROR', error: error.response.data.message })
    })
}

export async function registerUser(dispatch, registerPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: registerPayload,
  }
  // try {

  await axios({
    url: urls.REGISTER,
    ...requestOptions,
  })
    .then((response) => {
      dispatch({ type: 'REGISTER', payload: response.data })
      console.log('reg')
      localStorage.setItem('reg', 's')
      console.log(response.data)
      dispatch({ type: 'LOGIN_ERROR', error: null })
      return response.data
    })
    .catch((error) => {
      console.log(error.response.data)
      let error_message = Object.values(error.response.data.message)[0][0]
      dispatch({ type: 'LOGIN_ERROR', error: error_message })
    })
}

export async function logout(dispatch) {
  // let history = useHistory()
  dispatch({ type: 'LOGOUT' })
  localStorage.removeItem('currentUser')
  localStorage.removeItem('a-t')
}
