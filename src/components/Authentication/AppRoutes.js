import React, { useState, useEffect } from 'react'

import { Redirect, Route, useLocation } from 'react-router-dom'

import { useAuthState } from '../Context'
import Activate from './Activate'
import axios from '../Axios/axios'
import urls from '../Axios/urls'
import Loading from '../common/Loading'

const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const [ready, setReady] = useState(false)
  useEffect(async () => {
    await axios({
      url: urls.PROFILE,
    }).then((response) => {
      let resp = response.data.details.profile
      let user = JSON.parse(localStorage.getItem('currentUser'))
      user['is_verified'] = resp.is_verified
      user = localStorage.setItem('currentUser', JSON.stringify(user))
      // console.log('ss', resp)
      setReady(true)
    })
  })

  const userDetails = useAuthState()

  const token = JSON.parse(localStorage.getItem('currentUser'))

  let location = useLocation()
  console.log(location.pathname)
  return (
    <>
      {ready && (
        <Route
          path={path}
          render={(props) =>
            isPrivate && token === null ? (
              <Redirect to={{ pathname: '/login' }} />
            ) : token.is_verified === false ? (
              location.pathname !== '/profile' ? (
                <Activate />
              ) : (
                <Component {...props} />
              )
            ) : (
              <Component {...props} />
            )
          }
          {...rest}
        />
      )}
    </>
  )
}
export default AppRoute
