import React from 'react';
import '../css/cage.css';
export default class Cage extends React.Component {
  constructor(props) {
    super(props);
  }
  changeValue = (event) => {
    //console.log(this);
    if (this.props.value == "") {
      this.props.changeValue(this.props.index);
    }
  }
  render() {
    const { value } = this.props;
    //console.log(value);
    return (
      <span className="cage" onClick={this.changeValue}>{value}</span>
    )
  }
}