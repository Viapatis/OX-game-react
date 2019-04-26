import React from 'react';
import '../css/App.css';
import Board from './board'
import Controll from './controll'
import Cage from './cage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStage: 0,
      //gameStages=['choicePlayer', 'choiceMode', 'game', 'end'],
      end: {
        ind: "false",
        message: ''
      },
      playerType: 'X',
      mode: "player",
      difficulty: '0',
      restart: false
    }
  }
  finishGame = (message) => {
    this.setState({
      ...this.state,
      endGame: "true",
      message: message,
      gameStage: 3,
      restart: true
    })
  }
  setMode = (mode) => {
    const gameStage = mode === 'AI' ? 4 : 2;
    this.setState({
      ...this.state,
      mode: mode,
      gameStage: gameStage
    })
  }
  setDifficulty = (difficulty) => {
    this.setState({
      ...this.state,
      difficulty: difficulty,
      gameStage: 2
    })
  }
  setType=(type)=>{
    this.setState({
      ...this.state,
      playerType: type,
      gameStage: 1
    })
  }
  goToMenu = () => {
    this.setState({
      ...this.state,
      gameStage: 0
    })
  }
  onRestart = () => {
    this.setState({
      ...this.state,
      restart: false
    })
  }
  render() {
    const { message, endGame, gameStage, mode, difficulty, playerType, restart } = this.state;
    return (
      <div className="App" >
        <div className='gameArea' hidden={(gameStage !== 2)}>
          <Board finishGame={this.finishGame} mode={mode} difficulty={difficulty} playerType={playerType} onRestart={this.onRestart} restart={restart} />
        </div>
        <div className='selectModeArea' hidden={(gameStage !== 0)}>
          <Controll value='AI' text='1 player' playerChoice={this.setMode} />
          <Controll value='player' text='2 player' playerChoice={this.setMode} />
        </div>
        <div className='selectTypeArea' hidden={(gameStage !== 4)}>
          <Cage value='O' index='O' changeValue={this.setType} />
          <Cage value='X' index='X' changeValue={this.setType} />
        </div>
        <div className='selectDifficultyArea' hidden={(gameStage !== 1)}>
          <Controll value='0' text='easy' playerChoice={this.setDifficulty} />
          <Controll value='1' text='normal' playerChoice={this.setDifficulty} />
          <Controll value='2' text='hard' playerChoice={this.setDifficulty} />
        </div>
        <div className='endGame' hidden={(gameStage !== 3)}>
          <span className='message' visible={endGame}>{message}</span>
          <Controll value='' text='menu' playerChoice={this.goToMenu} />
          <Controll value={difficulty} text='restart' playerChoice={this.setDifficulty} />
        </div>
      </div>
    )
  }
}

export default App;
