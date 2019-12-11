import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import "./Gameboard.css"
import Board from '../../../components/Board/Board'
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner'


class Gameboard extends Component {
    state = {
        status: "New Game",
        squares: [{ 'id': 1, 'val': '', 'butDisable': true }, { 'id': 2, 'val': '', 'butDisable': true }, { 'id': 3, 'val': '', 'butDisable': true },
        { 'id': 4, 'val': '', 'butDisable': true }, { 'id': 5, 'val': '', 'butDisable': true }, { 'id': 6, 'val': '', 'butDisable': true },
        { 'id': 7, 'val': '', 'butDisable': true }, { 'id': 8, 'val': '', 'butDisable': true }, { 'id': 9, 'val': '', 'butDisable': true }],
        soloButton: "Play Solo",
        win: 0,
        lose: 0,
        tie: 0,
        loading: false,
        timer: null,
        player1: "",
        player2: "",
        playerTurn: null,
        onlineButton: "Play Online"
        //when game is over, update database with variable that switches to game over
        //if user quits game with game being over, no lose or win, tie, added. if there is a game still going, give user win etc...


    }
    async componentDidMount() {
        this.setState(
            { loading: true }
        )
        let headerf = new Headers();
        headerf = { 'Authorization': "JWT " + sessionStorage.getItem("userToken"), };
        const response2 = await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/user/record', { method: 'GET', headers: headerf, })
        if (response2.ok) {
            const gotRecord = await response2.json()
            this.setState({
                win: gotRecord['wins'],
                lose: gotRecord['loses'],
                tie: gotRecord['ties'],
                loading: false,
            })



        }
    }
    async componentWillUnmount() {
        clearInterval(this.timers);
    }
    setUserOption = async (tileClicked) => {
        let headerf = new Headers();
        console.log(sessionStorage.getItem("userToken"))
        headerf = { 'Authorization': "JWT " + sessionStorage.getItem("userToken"), 'Content-Type': 'application/json' };
        const response2 = await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/playermove', {
            method: 'PUT', headers: headerf, body: JSON.stringify({
                "move": tileClicked,
                "symbol": "x"
            })
        })
        if (response2.ok) {
            const info = await response2.json()
            console.log(info)
            if (info['Game Status'] === "Still going") {
                let previousSquares = this.state.squares.map(square => ({ ...square }))
                for (let i = 0; i < 9; i++) {
                    previousSquares[i].val = info['board'][i]
                    if (info['board'][i] === "") {
                        previousSquares[i].butDisable = false
                    }
                    else {
                        previousSquares[i].butDisable = true
                    }

                }
                this.setState({
                    squares: previousSquares,
                })


            }
            else {
                let headerf = new Headers();
                console.log(sessionStorage.getItem("userToken"))
                headerf = { 'Authorization': "JWT " + sessionStorage.getItem("userToken"), };
                const response2 = await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/user/record', { method: 'GET', headers: headerf, })
                if (response2.ok) {
                    let previousSquares = this.state.squares.map(square => ({ ...square }))
                    for (let i = 0; i < 9; i++) {
                        previousSquares[i].butDisable = true
                        previousSquares[i].val = info['board'][i]
                    }
                    const gotRecord = await response2.json()
                    this.setState({
                        win: gotRecord['wins'],
                        lose: gotRecord['loses'],
                        tie: gotRecord['ties'],
                        loading: false,
                        status: info['Game Status'],
                        squares: previousSquares
                    })
                }
            }
        }
    }
    setGameState = async () => {
        this.setState({
            loading: true
        })
        let headerf = new Headers();
        let info = this.state.soloButton
        if (info == "Play Solo") {
            headerf = { 'Authorization': "JWT " + sessionStorage.getItem("userToken") };
            const response3 = await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/gamehandle', { method: 'GET', headers: headerf, })
            if (response3.ok) {
                const info = await response3.json()
                let previousSquares = this.state.squares.map(square => ({ ...square }))
                for (let i = 0; i < 9; i++) {
                    if (info['active'] === true) {
                        if (info['board'][i] === "") {
                            previousSquares[i].butDisable = false
                        }
                        else {
                            previousSquares[i].butDisable = true
                        }
                    }
                    else {
                        previousSquares[i].butDisable = true
                    }

                    previousSquares[i].val = info['board'][i]

                }
                this.setState({
                    loading: false,
                    squares: previousSquares,
                    status: "Game in progress",
                    soloButton: "Quit",
                    player1: info['player1'],
                    player2: info['player2']

                })
            }
        }
        else {
            headerf = { 'Authorization': "JWT " + sessionStorage.getItem("userToken") };
            await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/gamehandle', { method: 'DELETE', headers: headerf, })
            let previousSquares = this.state.squares.map(square => ({ ...square }))
            for (let i = 0; i < 9; i++) {
                previousSquares[i].butDisable = true
                previousSquares[i].val = ""
            }
            this.setState({
                loading: false,
                squares: previousSquares,
                status: "New Game",
                soloButton: "Play Solo"

            })

        }

    }
    pollPVPStatus = async () => {
        let headerf = new Headers();
        headerf = { 'Authorization': "JWT " + sessionStorage.getItem("userToken") };
        const response3 = await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/pvpstatus', { method: 'GET', headers: headerf, })
        if (response3.ok) {
            const info = await response3.json()
            if (info.message == "Not in Game") {
                console.log("still searching")
                clearInterval(this.timers);
                let previousSquares = this.state.squares.map(square => ({ ...square }))
                for (let i = 0; i < 9; i++) {
                    previousSquares[i].butDisable = true
                }
                this.setState({
                    loading: false,
                    squares: previousSquares,
                    status: "Game Over",
                    onlineButton: "Quit",

                })

            }
            else {
                console.log(info)
                let previousSquares = this.state.squares.map(square => ({ ...square }))



                for (let i = 0; i < 9; i++) {
                    if (info["Game Status"] === "still going" || info["Game Status"] === "Still going") {
                        if (info['board'][i] === "") {
                            previousSquares[i].butDisable = false
                        }
                        else {
                            previousSquares[i].butDisable = true
                        }
                    }
                    else {
                        previousSquares[i].butDisable = true
                    }


                    previousSquares[i].val = info['board'][i]

                }
                if (info["Game Status"] !== "still going" && info["Game Status"] !== "Still going") {
                    clearInterval(this.timers);
                }
                this.setState({
                    loading: false,
                    squares: previousSquares,
                    status: info["Game Status"],
                    onlineButton: "Quit",
                    win: info['record']['wins'],
                    lose: info['record']['loses'],
                    tie: info['record']['ties'],
                    player1: info['player1'],
                    player2: info['player2'],
                    playerTurn: info["status"]

                })

            }

        }

    }

    startPVPGame = async () => {
        this.setState({
            loading: true
        })
        let headerf = new Headers();
        let info = this.state.onlineButton
        if (info === "Play Online") {
            headerf = { 'Authorization': "JWT " + sessionStorage.getItem("userToken") };
            const response3 = await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/pvpstart', { method: 'GET', headers: headerf, })
            if (response3.ok) {
                const info = await response3.json()
                let previousSquares = this.state.squares.map(square => ({ ...square }))
                for (let i = 0; i < 9; i++) {
                    if (info['active'] === true) {
                        if (info['board'][i] === "") {
                            previousSquares[i].butDisable = false
                        }
                        else {
                            previousSquares[i].butDisable = true
                        }
                    }
                    else {
                        previousSquares[i].butDisable = true
                    }

                    previousSquares[i].val = info['board'][i]

                }
                this.pollPVPStatus()
                this.timers = setInterval(this.pollPVPStatus, 10000);
                this.setState({
                    loading: false,
                    squares: previousSquares,
                    status: "Game in progress",
                    onlineButton: "Quit"

                })
            }
        }
        else {
            headerf = { 'Authorization': "JWT " + sessionStorage.getItem("userToken") };
            const response3 = await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/gamehandle', { method: 'DELETE', headers: headerf, })
            if (response3.ok) {
                let previousSquares = this.state.squares.map(square => ({ ...square }))
                for (let i = 0; i < 9; i++) {
                    previousSquares[i].butDisable = true
                    previousSquares[i].val = false
                }
                clearInterval(this.timers);
                this.setState({
                    loading: false,
                    squares: previousSquares,
                    status: "New Game",
                    onlineButton: "Play Online",
                    player1: "",
                    player2: "",

                })
            }
        }
    }
    render() {
        let stats =
            <React.Fragment>
                <div className="row align-items-center justify-content-center">
                    <h2>Wins: {this.state.win} Loses: {this.state.lose} Ties: {this.state.tie}</h2>
                </div>
                <Board square={this.state.squares} userInput={this.setUserOption} player1={this.state.player1} player2={this.state.player2} online={this.state.onlineButton} />
                <div className="row align-items-center justify-content-center">
                    <h3>{this.state.status}</h3>
                </div>
                <div className="row align-items-center justify-content-center" id="spaceup">
                    <Button onClick={() => { this.setGameState() }} className="cusClass">{this.state.soloButton}</Button>
                    <Button onClick={() => { this.startPVPGame() }} className="cusClass">{this.state.onlineButton}</Button>
                </div>
            </React.Fragment>

        if (this.state.loading === true) {
            stats = <LoadingSpinner />
        }
        return (
            <React.Fragment >
                {stats}
            </React.Fragment>
        );

    }
}

export default Gameboard;