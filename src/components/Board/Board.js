import React from 'react'
import TicTacToeButton from '../TicTacToeButton/TicTacToeButton';
import { Col, Row, Container } from 'react-bootstrap';

const board = (props) => (
    <React.Fragment>
        <div className="row align-items-center justify-content-center">
            {props.square.slice(0, 3).map(info => <TicTacToeButton buttonType={info} key={info.id} handleChange={props.userInput} />)}
        </div>
        <div className="row align-items-center justify-content-center">
            {props.square.slice(3, 6).map(info => <TicTacToeButton buttonType={info} key={info.id} handleChange={props.userInput} />)}
        </div>
        <div className="row align-items-center justify-content-center">
            {props.square.slice(6, 9).map(info => <TicTacToeButton buttonType={info} key={info.id} handleChange={props.userInput} />)}
        </div>
        <Container className="row align-items-center justify-content-center">
            <Row>
                <Col><h5>Player1: {props.player1}</h5> </Col>
            </Row>
        </Container>
        <Container className="row align-items-center justify-content-center">
            <Row>
                <Col ><h5>Player2: {props.player2 === "" && props.online === "Quit" ? "Looking for player..." : props.player2}</h5>  </Col>
            </Row>

        </Container>

    </React.Fragment>

)

export default board