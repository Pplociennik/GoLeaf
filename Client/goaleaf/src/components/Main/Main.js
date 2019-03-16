import React from 'react'
import styles from './Main.module.scss'
import { Switch, Route } from 'react-router-dom'
import LogIn from './LogIn/LogIn';
import SignIn from './SignIn/SignIn';


function Main() {
  return (
    <main className={styles.Main}>
    <Switch>
        <Route path='/login' component={LogIn}/>
        <Route path='/signin' component={SignIn}/>
    </Switch>
    </main>
  )
}

export default Main;