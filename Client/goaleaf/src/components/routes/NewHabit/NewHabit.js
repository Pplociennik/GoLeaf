import React, { Component } from 'react'
import './NewHabit.scss'

class NewHabit extends Component {

  state = {
    title: '',
    startsOn: new Date(),
    category: 'NONE',
    invite: [],
    private: false,
    recurrence: 'daily'
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
  }
  handleChange = e => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleChangeCategory = e => {
    this.setState({category: e.target.value})
  }
  handleChangePrivacy = e => {
    e.target.value === 'private' ? this.setState({private: true}) : this.setState({private: false});
  }

  render() {
    return (
      <div className="NewHabit">
        <form onSubmit={ this.handleSubmit }>
          <h1>New Habit</h1>
          <input className="InputField" type="text" id="title" placeholder="title" onChange={ this.handleChange } />
          <div>
            <h2>Category</h2>
            <input type="button" value="NONE"   onClick={ this.handleChangeCategory } />
            <input type="button" value="HEALTH" onClick={ this.handleChangeCategory }/>
            <input type="button" value="DIET" onClick={ this.handleChangeCategory }/>
            <input type="button" value="STUDY" onClick={ this.handleChangeCategory }/>
            <input type="button" value="WORK" onClick={ this.handleChangeCategory }/>
          </div>
          <div>
          <input type="button" value="public" onClick={ this.handleChangePrivacy } />
          <input type="button" value="private" onClick={ this.handleChangePrivacy } />
          </div>
          <div>
              <h2>Add friends</h2>
              <input type="text" placeholder="username" />
              <input type="button" value="+" />
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  } 
}

export default NewHabit;
