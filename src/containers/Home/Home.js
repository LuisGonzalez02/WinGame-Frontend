import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import JumboStyle from '../../components/JumboStyle/JumboStyle'


class Home extends Component {
  state = {}
  render() {
    return (<div>
      <NavigationBar />
      <JumboStyle display="Play to Win" />
      <Container>
        <div className="row align-items-center justify-content-center">
          <h2><span>Play . </span>  <span>Have Fun .</span><span> Win</span></h2>
        </div>
      </Container>
    </div>);
  }
}

export default Home;

