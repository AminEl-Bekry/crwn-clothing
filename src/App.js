import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from 'react-redux';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';

// imported pages
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors'

import { createStructuredSelector } from 'reselect'

class App extends React.Component  {

  unsubscribeFromAuth = null

  // We set the user to current sign in when we mount the app
  componentDidMount() {
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        // creating a new user in the firebase db
        const userRef = await createUserProfileDocument(userAuth)

        // adding user data to app by setting the state with user data
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      } else {
        // setting currentUser to null when the user logs out
        setCurrentUser({currentUser: userAuth})
      }
    })
  }

  // When we unmount, we sign out the user
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/shop/*' element={<ShopPage/>} />
          <Route path='/checkout' element={<CheckoutPage/>} />
          <Route path='/signin' element={() => this.props.currentUser ? (<Navigate replace to='/'/>) : (<SignInAndSignUp />)} />
        </Routes>
      </div> // Sign in page redirects if a user ins logged in or renders if no one is logged in
    );
  }
}

// getting user state from redux, now we have access to this.props.currentUser
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
// sending state change to user actions to update user reducer state
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);