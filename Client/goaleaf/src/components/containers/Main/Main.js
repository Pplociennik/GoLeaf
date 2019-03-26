import React from 'react'
import styles from './Main.module.scss'
import { Switch, Route } from 'react-router-dom'
import LogIn from './../../Auth/LogIn/LogIn';
import SignIn from './../../Auth/SignIn/SignIn';
import ResetPassword from './../../Auth/ResetPassword/ResetPassword';
import Dashboard from './../../Dashboard/Dashboard';


function Main() {
  return (
    <main className={styles.Main}>
        <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/login' component={LogIn}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/reset-password' component={ResetPassword}/>
            <Route path="*" component={Dashboard} />
        </Switch>
    </main>
  )
}

export default Main;