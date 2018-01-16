import React, { Component } from 'react';
import CellsRow from '../CellsRow';
import './index.css';

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

class Game extends Component {
    state = {
        map: {},
        rows: 4,
        columns: 4,
    };

    generateNewMap = (withShuffle = false) => {
        const { rows, columns } = this.state;
        const game = {};
        let array = Array.from(Array(rows * columns).keys());
        if (withShuffle) {
            array = shuffle(array);
        }
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            game[rowIndex.toString()] = [];
            for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
                const totalIndex = columns * rowIndex + columnIndex + 1;
                const value = array[totalIndex - 1];
                game[rowIndex].push({
                    row: rowIndex,
                    column: columnIndex,
                    id: value + 1,
                    text: (value + 1).toString(),
                    isBlank: (value + 1) === (columns * rows)
                });
            }
        }
        return game
    };

    componentWillMount() {
        this.startNewGame();
    }

    getStandardMap = () => this.generateNewMap();

    getRandomizedMap = () => this.generateNewMap(true);

    startNewGame = () => {
        const { columns, rows } = this.state;
        const game = this.getStandardMap();
        this.setState({
            cells: { ...game },
            blankIndex: columns * rows,
        });
    };

    startRandomGame = () => {
        this.setState({ cells: this.getRandomizedMap() });
    };

    checkIfWon = () => {
        const { cells } = this.state;
        const flatCells = Object.values(cells).reduce((result, row) => {
            return result.concat(row)
        }, []);

        const isSorted = flatCells.reduce((result, cell, index, array) => {
            if (Boolean(array[index + 1])) {
                const nextidId = array[index + 1].id;
                const thisId = cell.id;
                return nextidId > thisId;
            }
            return result
        }, false);
        if (isSorted) {
            alert('Это успех!')
        }
    };

    swapCells = (a, b) => {
        const { cells } = this.state;
        const nextGameState = Object.assign({}, cells);
        nextGameState[a.row][a.column] = Object.assign({}, b, { column: a.column, row: a.row });
        nextGameState[b.row][b.column] = Object.assign({}, a, { column: b.column, row: b.row });
        this.setState({ cells: nextGameState }, this.checkIfWon);


    };

    handleTurn = cell => {
        const map = this.state.cells;
        const top = map[cell.row - 1] && map[cell.row - 1][cell.column];
        const bottom = map[cell.row + 1] && map[cell.row + 1][cell.column];
        const left = map[cell.row][cell.column - 1];
        const right = map[cell.row][cell.column + 1];
        const neighbors = [top, right, bottom, left].filter(Boolean);

        const { blankIndex } = this.state;
        const blank = neighbors.find(cell => cell.id === blankIndex);

        if (blank) {
            this.swapCells(Object.assign({}, cell), Object.assign({}, blank));
        }
    };

    changeColumnsLength = e => {
        this.setState({ columns: e.target.value }, this.startNewGame)
    };

    changeRowsLength = e => {
        this.setState({ rows: e.target.value }, this.startNewGame)
    };

    render() {
        const { cells } = this.state;
        return (
            <div className="game">
                <div className="control">
                    <label htmlFor="columns">Columns</label>
                    <input type="range" min={2} max={6} onChange={this.changeColumnsLength} value={this.state.columns} id="columns" />
                </div>
                <div className="control">
                    <label htmlFor="rows">Rows</label>
                    <input type="range" min={2} max={6} onChange={this.changeRowsLength} value={this.state.rows} id="rows" />
                </div>
                <div className="game__content">
                    <button
                        className="button button-green"
                        type="button"
                        onClick={this.startNewGame}
                    >
                        Start from scratch
                    </button>
                    <button
                        className="button button-red"
                        type="button"
                        onClick={this.startRandomGame}
                    >
                        Randomize
                    </button>
                    {
                        Object.values(cells).map(rowCells => {
                            return <CellsRow cells={rowCells} handleTurn={this.handleTurn} />
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Game;
