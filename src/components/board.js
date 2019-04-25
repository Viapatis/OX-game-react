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
    componentDidMount = () => {
        const timerID = setInterval(() => {
            console.log('turn')
            this.aiTurn();
        }, 500)
    }
    aiTurn = () => {
        const { cageValues, currentTurnType, end } = this.state;
        const { mode, difficulty, playerType } = this.props;
        if (mode === 'AI' && currentTurnType !== playerType && !end) {
            console.log(difficulty, playerType)
            const index = makeAutoselction(cageValues, difficulty, playerType);
            this.changeValue(index);
        }
    }
    render() {
        const { cageValues, end, bot } = this.state;
        const { mode, restart } = this.props;
        const cages = cageValues.map((value, index) => {
            return (<Cage value={value} index={index} changeValue={this.changeValue} />)
        });
        const checkResult = checkWinner(cageValues);
        if (restart) {
            this.restart();
        }
        if (!end) {
            const endGame = checkResult ? (checkResult === 'end' ? 'End Game' : 'Winner ' + checkResult) : '';
            console.log(endGame);
            console.log(cageValues);
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
    const vinCombination = ['123', '456', '789', '159', '357', '147', '258', '369'];
    const involvedCages = {
        'X': [],
        'O': []
    }
    array.forEach((element, index) => {
        if (element !== ' ')
            involvedCages[element].push('' + (index + 1));
    });
    if (involvedCages.X.length + involvedCages.O.length < 4)
        return null;
    for (let k in involvedCages) {
        const allPosition = involvedCages[k].sort().join('');
        for (let i = 0; i < vinCombination.length; i++) {
            //console.log(allPosition, allPosition.indexOf(vinCombination[i]));
            if (allPosition.indexOf(vinCombination[i]) !== -1) {
                return k;
            }
        }
    }
    if (involvedCages.X.length + involvedCages.O.length === 9)
        return 'end';
    return null;
}

function makeAutoselction(array, difficulty, playerType) {
    //console.log(difficulty);
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
            //console.log(result, testAr);
            if (result === playerType) {
                return free[i];
            }
        }
    }
    if (difficulty !== '2') {
        const r = Math.random();
        //console.log(Math.ceil(free.length * r) - 1, free);
        return free[Math.ceil(free.length * r) - 1];
    } else {
        const myCage = [];
        const vinCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
        const additionalComb = [0, 2, 6, 8];
        const balanceComb = [1, 3, 5, 7];
        array.forEach((element, index) => {
            if (element !== ' ' && element !== playerType) {
                myCage.push(index);
            }
        });
        for (let k = 0; k < vinCombination.length; k++) {
            const element = vinCombination[k]
            let counter = 0;
            let wInd = 0;
            for (let j = 0; j < element.length; j++) {
                if (checkArrey(myCage, element[j])) {
                    counter++;
                } else {
                    wInd = element[j];
                }
            }
            console.log(myCage, counter, element, wInd);
            if (counter == 2) {
                console.log(myCage, counter, element);
                if (array[wInd] === ' ') {
                    return wInd;
                }
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
    console.log('nichego ne vibral')
}
function checkArrey(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
        if (elem == arr[i]) {
            return true
        }
    }
    return false;
}