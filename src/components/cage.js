import React from 'react';
import '../css/cage.css';
export default class Cage extends React.Component {
  changeValue = (event) => {
    //console.log(this);
      this.props.changeValue(this.props.index);
  }
  render() {
    const { value } = this.props;
    return (
      <span className="cage" onClick={this.changeValue}>{value}</span>
    )
  }
}