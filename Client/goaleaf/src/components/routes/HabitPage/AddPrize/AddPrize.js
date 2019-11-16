import React, { Component } from 'react'
import axios from 'axios';
import Popup from "reactjs-popup";
import M from "materialize-css";

class AddPrize extends Component {

  state = {
    msg: null,
    prize: null,
    prizePoints: 50
  }

    addPrize = (e, id) => {
        e.preventDefault();
        axios.post(`/api/habits/habit/setPointsToWIn?habitID=${id}&pointsToWin=${this.state.prizePoints}`)
        .then(res => {
            window.location.reload();
        }
        ).catch(err => console.log(err.response.data.message))

    }

    addPrizePoint = e => {
        e.preventDefault();

        if(this.state.prizePoints < 1000) {
            this.setState({prizePoints: this.state.prizePoints + 1})
        }
    }
    subtractPrizePoint = e => {
        e.preventDefault();

        if(this.state.prizePoints > 1) {
            this.setState({prizePoints: this.state.prizePoints - 1})
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    clearMsg = () => {
        this.setState({
            msg: null
        })
    }

    componentDidMount() {
        M.AutoInit();
    }

    render() {

    return (
        <Popup trigger={<button className="btn waves-effect waves-light add-task-btn habit-page-navigation-btn" ><span>Set prize</span></button>} modal closeOnDocumentClick
            onOpen={ this.clearMsg }
            contentStyle={{
                maxWidth: '80%',
                width: '500px',
                backgroundColor: '#f2f2f2',
                borderRadius: '30px',
                border: "none"
            }}
            overlayStyle={{
                background: "rgb(0,0,0, 0.4)"
            }}
        >
        <div className="add-task-box">
        <div className="row">
            <form className="col s10 offset-s1  l8 offset-l2 center-align" autoComplete="off">
                <h4 className="">Set prize</h4>
                <div className="input-field inline">
                    <input id="task" type="text" placeholder="prize description" onChange={ this.handleChange } />
                    <button className="task-points-btn task-points-btn-subtract" onClick={ this.subtractPrizePoint }>-</button>
                    <span className="task-points">{ this.state.prizePoints }</span>
                    <button className="task-points-btn task-points-btn-add" onClick={ this.addPrizePoint }>+</button>
                    <span className={this.state.msg === 'Prize set' ? "helper-text green-text" : "helper-text red-text "}>{this.state.msg}</span>
                </div>
                <button className="btn" onClick={(e) => this.addPrize(e, this.props.habitID)} type="submit" value="Set prize">
                    <span>Set prize</span>
                </button>
            </form>
            </div>
        </div>
    </Popup>
    )
  } 
}

export default AddPrize;