import React from 'react';
import Cage from './cage';
import '../css/board.css';
export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cageValues: Array(9).fill(' '),
            turnType: {
                'false': "X",
                'true': 'O'
            },
            end: '',
            currentTurnType: 'X'

        }
    }
    changeValue = (index) => {
        const { cageValues, currentTurnType, turnType } = this.state;
        const { playerType, mode } = this.props;
        if (currentTurnType === playerType && mode === 'AI' || mode !== "AI") {
            if (cageValues[index] === " ") {
                const newCageValues = [...cageValues];
                newCageValues[index] = currentTurnType;
                const nextTurnType = turnType[currentTurnType === "X"];
                this.setState({
                    ...this.state,
                    cageValues: newCageValues,
                    currentTurnType: nextTurnType
                })
                setTimeout(() => {
                    this.aiTurn();
                }, 500)
            }
        }
    }
    restart = () => {
        this.setState({
            cageValues: Array(9).fill(' '),
            turnType: {
                'false': "X",
                'true': 'O'
            },
            end: '',
            currentTurnType: 'X'
        })
        this.props.onRestart();
    }
    aiTurn = () => {
        const { cageValues, currentTurnType, end, turnType } = this.state;
        const { mode, difficulty, playerType } = this.props;
        if (mode === 'AI' && currentTurnType !== playerType && !end) {
            // console.log(difficulty, playerType)
            const index = makeAutoselction(cageValues, difficulty, playerType, currentTurnType);
            if (cageValues[index] === " ") {
                const newCageValues = [...cageValues];
                newCageValues[index] = currentTurnType;
                const nextTurnType = turnType[currentTurnType === "X"];
                this.setState({
                    ...this.state,
                    cageValues: newCageValues,
                    currentTurnType: nextTurnType
                })
            }
        }
    }
    render() {
        const { cageValues, end } = this.state;
        const { restart, playerType,mode} = this.props;
        const cages = cageValues.map((value, index) => {
            return (<Cage value={value} index={index} changeValue={this.changeValue} />)
        });
        const checkResult = checkWinner(cageValues);
        if (restart) {
            this.restart();
        }
        if (playerType === 'O'&&mode==='AI') {
            setTimeout(() => {
                this.aiTurn();
            }, 500)
        }
        if (!end) {
            const endGame = checkResult ? (checkResult === 'end' ? 'End Game' : 'Winner ' + checkResult) : '';
            // console.log(endGame);
            if (endGame) {
                this.props.finishGame(endGame);
            }
        }
        return (
            <div className="board" >
                {cages}
            </div>
        )
    }
}

function checkWinner(array) {
    const vinCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
    const involvedCages = {
        'X': [],
        'O': []
    }
    // console.log(array);
    array.forEach((element, index) => {
        if (element !== ' ')
            involvedCages[element].push(index);
    });
    if (involvedCages.X.length + involvedCages.O.length < 4)
        return null;
    for (let k in involvedCages) {
        const allPosition = involvedCages[k].sort();
        for (let i = 0; i < vinCombination.length; i++) {
            const element = vinCombination[i]
            let counter = 0;
            for (let j = 0; j < element.length; j++) {
                if (checkArrey(allPosition, element[j])) {
                    counter++;
                }
            }
            if (counter === 3) {
                return k;
            }
        }
    }
    if (involvedCages.X.length + involvedCages.O.length === 9)
        return 'end';
    return null;
}

function makeAutoselction(array, difficulty, playerType, AItype) {
    const free = [];
    array.forEach((element, index) => {
        if (element === ' ') {
            free.push(index);
        }
    });
    if (difficulty !== '0') {
        for (let i = 0; i < free.length; i++) {
            const item = free[i];
            const testAr = [...array];
            testAr[item] = playerType;
            const result = checkWinner(testAr);
            if (result === playerType) {
                return free[i];
            }
        }
    }
    if (difficulty !== '2') {
        const r = Math.random();
        return free[Math.ceil(free.length * r) - 1];
    } else {
        const additionalComb = [0, 2, 6, 8];
        const balanceComb = [1, 3, 5, 7];
        for (let i = 0; i < free.length; i++) {
            const item = free[i];
            const testAr = [...array];
            testAr[item] = AItype;
            const result = checkWinner(testAr);
            if (result === playerType) {
                return free[i];
            }
        }
        if (array[4] === ' ') {
            return 4;
        } else {
            for (let i = 0; i < additionalComb.length; i++) {
                const element = additionalComb[i]
                if (array[element] === ' ') {
                    return element;
                }
            }
            for (let i = 0; i < balanceComb.length; i++) {
                const element = balanceComb[i]
                if (array[element] === ' ') {
                    return element;
                }
            }
        }
    }
}
function checkArrey(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (elem === arr[i]) {
            return true
        }
    }
    return false;
}