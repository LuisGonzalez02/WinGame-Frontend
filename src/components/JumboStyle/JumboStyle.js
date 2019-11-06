import React, { Component } from 'react'
import { Jumbotron as Jumbo, Container } from 'react-bootstrap';
import styled from 'styled-components';
import boatImage from '../../assets/boatImage.jpg'

const Styles = styled.div`
  .jumbo {
    background: url(${boatImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

class JumboStyle extends Component {
    render() {
        return (
            <Styles>
                <Jumbo fluid className="jumbo">
                    <div className="overlay"></div>
                    <Container>
                        <h1>{this.props.display}</h1>
                    </Container>
                </Jumbo>
            </Styles>
        )
    }
}

export default JumboStyle