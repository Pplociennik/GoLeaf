import React, { Component } from 'react'
import './Main.scss';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './../../hoc/PrivateRoute';
import LogIn from './../../routes/Auth/LogIn';
import SignIn from './../../routes/Auth/SignIn';
import ResetPassword from './../../routes/Auth/ResetPassword';
import NewPassword from './../../routes/Auth/NewPassword';
import Dashboard from './../Dashboard/Dashboard';
import NewHabit from './../../routes/NewHabit/NewHabit'


class Main extends Component {
  render(){
  return (
    <main className="Main">
        <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route exact path='/new-habit' component={NewHabit}/>
            <Route exact path='/login' component={LogIn}/>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/reset-password' component={ResetPassword}/>
            <Route exact path='/new-password' component={NewPassword}/>
            <Route path="*" component={Dashboard} />
        </Switch>
    </main>
  )
  }
}

const mapStateToProps = state => ({ authenticated: state.authenticated })

export default connect(mapStateToProps)(Main);