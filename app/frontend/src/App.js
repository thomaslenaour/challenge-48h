import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import { useAuth } from './hooks/AuthHooks'
import { AuthContext } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PlacesPages from './pages/PlacesPage'
import MapPage from './pages/MapPage'
import 'react-toastify/dist/ReactToastify.css'
import AccountPage from './pages/AccountPage'
import ReservationPage from './pages/ReservationPage'

function App() {
  const { token, login, logout, userId } = useAuth()
  let routes

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/places" component={PlacesPages} />
        <Route exact path="/map" component={MapPage} />
        <Route exact path="/account" component={AccountPage} />
        <Route
          exact
          path="/reservation/:companyId"
          component={ReservationPage}
        />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/places" component={PlacesPages} />
        <Route exact path="/map" component={MapPage} />
        <Route
          exact
          path="/reservation/:companyId"
          component={ReservationPage}
        />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <Navbar />
        <main>{routes}</main>
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </AuthContext.Provider>
  )
}

export default App
