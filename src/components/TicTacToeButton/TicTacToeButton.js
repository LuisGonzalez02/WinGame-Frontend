import React from "react"
import { Button } from 'react-bootstrap';
import classes from '../../containers/Game/Game.module.css'

function TicTacToeButton(props) {
    return (
        <Button
            className={classes.boardTile}
            disabled={props.buttonType.butDisable}
            onClick={() => props.handleChange(props.buttonType.id)}
            key={props.buttonType.id} >
            {props.buttonType.val}
        </Button>
    )
}
export default TicTacToeButton