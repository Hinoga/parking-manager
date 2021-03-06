import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './views/Login/Login'
import Singup from './views/Login/Signup'
import Admin from 'layouts/Admin.js'

import { useUser } from 'context/user'
import Spinner from './components/Lottie/LoadingAnimation'
import Loading from './components/Loading/Loading'

const Routes = _ => {
  const [user] = useUser()

  const renderRoutes = _ => {
    return (
      <Switch>
        <Route path='/admin' component={Admin} />
        <Redirect to='/admin/inicio' />
      </Switch>
    )
  }

  const renderPublicRoutes = () => {
    return (
      <Switch>
        <Route path={`/login`} render={props => <Login {...props} />} />
        <Route path={`/sign-up`} render={props => <Singup {...props} />} />
        <Redirect to='/login' />
      </Switch>
    )
  }

  return !user.status.loading ? (
    <>
      {user.status.loggedIn ? (
        <Suspense fallback={Loading}>{renderRoutes()}</Suspense>
      ) : (
        renderPublicRoutes()
      )}
    </>
  ) : (
    <Spinner />
  )
}

export default Routes
