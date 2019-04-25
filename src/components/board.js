import React from 'react';
import Cage from './cage';
import '../css/board.css';
export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cageValues: Array(9).fill(''),
            turnType: {
                'false': "X",
                'true': 'O'
            },
            currentTurnType: 'X',
            end: ''
        }
    }
    changeValue = (index) => {
        if (!this.state.end) {
            const { cageValues, currentTurnType, turnType } = this.state;
            const newCageValues = [...cageValues];
            newCageValues[index] = currentTurnType;
            const nextTurnType = turnType[currentTurnType == "X"];
            //console.log(newCageValues);
            this.setState({
                ...this.state,
                cageValues: newCageValues,
                currentTurnType: nextTurnType
            })
            //console.log(this.state)
        }
    }
    render() {
        const { cageValues, end } = this.state;
        const cages = cageValues.map((value, index) => {
            return (<Cage value={value} index={index} changeValue={this.changeValue} />)
        });
        const checkResult = checkVinner(cageValues);
        if (!end) {
            const endGame = checkResult ? (checkResult === 'end' ? 'End Game' : 'Winner ' + checkResult) : '';
            console.log(endGame);
            if (endGame) {
                this.props.finishGame(endGame);
                this.setState({
                    ...this.state,
                    end: endGame
                })
            }
        }
        return (
            <div className="board" >
                {cages}
            </div>
        )
    }
}
function checkVinner(array) {
    const vinCombination = ['123', '456', '789', '159', '357', '147', '258', '369']
    const involvedCages = {
        'X': [],
        'O': []
    }
    array.forEach((element, index) => {
        if (element)
            involvedCages[element].push('' + (index + 1));
    });
    if (involvedCages.X.length + involvedCages.O.length < 5)
        return null;
    for (let key in involvedCages) {
        const allPosition = involvedCages[key].sort().join('');
        console.log(key, allPosition, involvedCages[key]);
        for (let i = 0; i < vinCombination.length; i++) {
            console.log(vinCombination[i], allPosition.indexOf(vinCombination[i]), allPosition.indexOf(vinCombination[i]) !== -1)
            if (allPosition.indexOf(vinCombination[i]) !== -1) {
                console.log(key);
                return key;
            }
        }
    }
    if (involvedCages.X.length + involvedCages.O.length === 9)
        return 'end';
    return null;
}