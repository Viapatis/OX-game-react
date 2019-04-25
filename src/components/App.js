import React from 'react';
import '../css/App.css';
import Board from './board'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endGame: "false",
      message: ''
    }
  }
  finishGame = (message) => {
    this.setState({
      ...this.state,
      endGame: "true",
      message: message
    })
  }
  render() {
    const { message, endGame } = this.state;
    return (
      <div className="App" >
        <div className='gameArea'>
          <Board finishGame={this.finishGame} />
          <span className='message' visible={endGame}>{message}</span>
        </div>
        <div className='controlArea'>
          <button className='controll'>&#8635;</button>
          <button className='controll'>&#8635;</button>
        </div>
      </div>
    )
  }
}

export default App;
