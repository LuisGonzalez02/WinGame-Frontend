import { Button, Container } from 'react-bootstrap';
import React, { Component } from 'react';
import Gameboard from './GameBoard/Gameboard';
import Leaderboard from './Leaderboard/Leaderboard';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import classes from './Game.module.css'
import JumboStyle from '../../components/JumboStyle/JumboStyle'

class Game extends Component {
    state = {
        condition: true
    }

    handleClick = (condition) => {
        this.setState({ condition })
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <JumboStyle display="Game" />
                <Container>
                    <div className="row align-items-center justify-content-center">
                        <Button onClick={() => { this.handleClick(true) }} size="lg" className={classes.cusClass} disabled={this.state.condition}>Game</Button>
                        <Button onClick={() => { this.handleClick(false) }} size="lg" className={classes.cusClass} disabled={!this.state.condition}>Leaderboard</Button>
                    </div>
                    <div className="spaceLittle">
                        {this.state.condition === true ? <Gameboard /> : <Leaderboard />}
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}

export default Game;

