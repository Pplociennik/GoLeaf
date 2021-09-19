import React, { Component } from 'react'
import axios from 'axios';
import Popup from "reactjs-popup";
import M from "materialize-css";

class AddPrize extends Component {

  state = {
    msg: null,
    prizePoints: 0,
    leaderPoints: 0
  }

    addPrize = (e, id) => {
        e.preventDefault();
        if(this.state.prizePoints > 0 && this.state.prizePoints < 1001 && this.state.prizePoints > this.state.leaderPoints){
            axios.post(`http://localhost:8081/api/habits/habit/setPointsToWIn?habitID=${id}&pointsToWin=${this.state.prizePoints}`)
            .then(res => {
                window.location.reload();
            }
            ).catch(err => console.log(err.response.data.message))
        }
        if(this.state.prizePoints <= this.state.leaderPoints) {
            this.setState({
                msg: "Prize has to be greater than " + this.state.leaderPoints + ", current leader's points!"
            })
        }
    }

    addPrizePoint = e => {
        e.preventDefault();

        if(parseInt(this.state.prizePoints) < 1000) {
            this.setState({prizePoints: parseInt(this.state.prizePoints) + 1})
        }
    }
    subtractPrizePoint = e => {
        e.preventDefault();

        if(parseInt(this.state.prizePoints) > 1 && this.state.prizePoints) {
            this.setState({prizePoints: parseInt(this.state.prizePoints) - 1})
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
    clearMsg = () => {
        this.setState({
            //prizePoints: this.props.pointsToWin
        })
    }

    componentDidMount() {
        M.AutoInit();
        if(this.props.pointsToWin !== 0){
            this.setState({prizePoints: this.props.pointsToWin})
        }
        axios.get(`http://localhost:8081/api/members/leader/points?habitID=${this.props.habitID}`)
        .then(res => {
            this.setState({
                leaderPoints: res.data
            })
        }).catch(err => { console.log(err) })
    }

    render() {
        let addPrizeBtn;
    if(this.props.isAdmin){
    addPrizeBtn = this.props.isFinished ? <button className="btn waves-effect waves-light add-task-btn habit-page-navigation-btn" disabled><span role="img" aria-label="icon">🏆 set goal</span></button> : <button className="btn waves-effect waves-light add-task-btn habit-page-navigation-btn" ><span role="img" aria-label="icon">🏆 {this.props.pointsToWin === 0 ? 'set' : 'update'} goal</span></button>
    }
    return (
        <Popup trigger={addPrizeBtn} modal closeOnDocumentClick
            onOpen={ this.clearMsg }
            onClose={ this.clearPoints }
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
                <h4 className="">{this.props.pointsToWin === 0 ? 'Set' : 'Update'} goal</h4>
                <div className="input-field inline">
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                        <button className="task-points-btn task-points-btn-subtract" onClick={ this.subtractPrizePoint }>-</button>
                        <input title="Set goal between 1 and 1000" id="prizePoints" maxLength="4" style={{width: '50px', textDecoration: 'none', textAlign: 'center' }} className="task-points" value={this.state.prizePoints} onChange={(e) => {this.handleChange(e)}}/>
                        <button className="task-points-btn task-points-btn-add" onClick={ this.addPrizePoint }>+</button>
                    </div>
                    <span style={{marginTop: "10px"}} className={this.state.msg === 'Goal set' ? "helper-text green-text" : "helper-text red-text "}>{this.state.msg}</span>
                </div>
                <button className="btn" onClick={(e) => this.addPrize(e, this.props.habitID)} type="submit" value="Set goal">submit</button>
            </form>
            </div>
        </div>
    </Popup>
    )
  } 
}

export default AddPrize;