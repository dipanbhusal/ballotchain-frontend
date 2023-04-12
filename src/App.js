import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import Mainlayout from './components/Layout/Mainlayout'
import Vote from './components/Vote/Vote'
import Candidates from './components/Candidates/Candidates'
import Parties from './components/Parties/Parties'
import { AuthProvider } from './components/Context/context'
import AppRoute from './components/Authentication/AppRoutes'
import Profile from './components/Authentication/Profile'
import ElectionList from './components/Election/ElectionList'
import ElectionResult from './components/Election/ElectionResult'
import Activate from './components/Authentication/Activate'

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Mainlayout>
              <AppRoute exact path="/" isPrivate={true}>
                <Redirect to="/home" />
              </AppRoute>

              <AppRoute
                exact
                path="/home"
                exact
                component={Home}
                isPrivate={true}
              />
              <AppRoute
                exact
                path="/vote"
                exact
                component={Vote}
                isPrivate={true}
              />
              <AppRoute
                exact
                path="/elections"
                exact
                component={ElectionList}
                isPrivate={true}
              />
              <AppRoute
                exact
                path="/election-result"
                exact
                component={ElectionResult}
                isPrivate={true}
              />

              <AppRoute
                exact
                path="/candidates"
                exact
                component={Candidates}
                isPrivate={true}
              />
              <AppRoute
                exact
                path="/parties"
                exact
                component={Parties}
                isPrivate={true}
              />
              <AppRoute
                exact
                path="/profile"
                exact
                component={Profile}
                isPrivate={true}
              />
              <AppRoute
                exact
                path="/activate"
                exact
                component={Activate}
                isPrivate={true}
              />
            </Mainlayout>
          </Switch>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
