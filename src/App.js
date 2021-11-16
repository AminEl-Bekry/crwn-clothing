import React from 'react';
import { Routes, Route } from "react-router-dom";
import { auth } from './firebase/firebase.utils';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

class App extends React.Component  {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  // We set the user to current sign in when we mount the app
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({user: user})
      console.log(user)
    })
  }

  // When we unmount, we sign out the user
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/shop' element={<ShopPage/>} />
          <Route path='/signin' element={<SignInAndSignUp/>} />
        </Routes>
      </div>
    );
  }
}

export default App;