import React, { Component } from 'react';
import { Table } from 'react-bootstrap';


class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      table: []

    };

  }
  async componentDidMount() {
    let headerf = new Headers();
    headerf = { 'Authorization': "JWT " + sessionStorage.getItem("userToken") };
    const response2 = await fetch('https://cors-anywhere.herokuapp.com/https://winagame-backend.herokuapp.com/leaderboard', {
      method: 'GET',
      headers: headerf,
    })
    if (response2.ok) {
      const gotRecord = await response2.json();
      let createdTable = []
      let children = []
      children.push(<th key='user'>Username</th>)
      children.push(<th key='win'>Wins</th>)
      children.push(<th key='lose'>Loses</th>)
      children.push(<th key='tie'>Ties</th>)
      createdTable.push(<tr key='heading'>{children}</tr>)
      // Outer loop to create parent
      for (let i = 0; i < gotRecord['leaders'].length; i++) {
        children = []
        children.push(<td key={`name ${i}`}>{gotRecord['leaders'][i]['name']}</td>)
        children.push(<td key={`wins ${i}`}>{gotRecord['leaders'][i]['wins']}</td>)
        children.push(<td key={`loses ${i}`}>{gotRecord['leaders'][i]['loses']}</td>)
        children.push(<td key={`ties ${i}`}>{gotRecord['leaders'][i]['ties']}</td>)
        //Create the parent and add the children
        createdTable.push(<tr key={i + 6}>{children}</tr>)
      }
      this.setState({ table: createdTable });

    }



  }
  state = {}
  render() {
    if (this.state.table.length === 0) {
      return null;
    }
    else {
      return (
        <Table>
          <tbody>
            {this.state.table}
          </tbody>
        </Table>
      );
    }
  }
}

export default Leaderboard;
