import React from 'react';
import '../css/controll.css';
export default class Controll extends React.Component {
  onClick = (event) => {
    this.props.playerChoice(this.props.value);
  }
  render() {
    const { text } = this.props;
    return (
        <span className='controll'onClick={this.onClick}>{text}</span>
    )
  }
}