import React, { Component } from 'react';

import './Game.css';

import X from './img/X.svg';
import O from './img/O.svg';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ],
            currentPlayer: (((Math.floor(Math.random() * 10)) % 2) === 0 ? 'x' : 'o'),
            moveCount: 0,
            gameEnd: false,
            message: null
        }
    }

    componentDidMount() {
        this.setState({
            message: `It's ${this.state.currentPlayer.toUpperCase()} turn`
        })
    }

    resetBoard = () => {
        this.setState({
            board: [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ],
            currentPlayer: (((Math.floor(Math.random() * 10)) % 2) === 0 ? 'x' : 'o'),
            moveCount: 0,
            gameEnd: false
        }, () => {
            this.setState({
                message: `It's ${this.state.currentPlayer.toUpperCase()} turn`
            })
        });
    }

    getBackground = (x, y) => {
        const value = this.state.board[x][y];
        const background = value === ' ' ? 'none' : value === 'o' ? `url(${O})` : `url(${X})`;
        return background;
    }

    handleTileClick = (x, y) => {
        if(this.state.board[x][y] === ' ' && this.state.gameEnd === false) {
            const newBoard = [...this.state.board];
            newBoard[x][y] = this.state.currentPlayer;
            this.setState({
                board: newBoard,
                currentPlayer: this.state.currentPlayer === 'o' ? 'x' : 'o',
                moveCount: this.state.moveCount + 1,
                message: `It's ${this.state.currentPlayer === 'o' ? 'X' : 'O'} turn`
            });

            // check if the game is done

            // check draw
            if(this.state.moveCount === 8) this.setState({ gameEnd: true, message: `There is no winner, draw` });

            // check col
            for(let i = 0; i < 3; i++) {
                if(this.state.board[x][i] !== this.state.currentPlayer) break;
                if(i === 2) this.setState({ gameEnd: true, message: `The winner is ${this.state.currentPlayer.toUpperCase()}` });
            }

            // check row
            for(let i = 0; i < 3; i++) {
                if(this.state.board[i][y] !== this.state.currentPlayer) break;
                if(i === 2) this.setState({ gameEnd: true, message: `The winner is ${this.state.currentPlayer.toUpperCase()}` });
            }

            // check diag
            if(x === y) {
                for(let i = 0; i < 3; i++) {
                    if(this.state.board[i][i] !== this.state.currentPlayer) break;
                    if(i === 2) this.setState({ gameEnd: true, message: `The winner is ${this.state.currentPlayer.toUpperCase()}` });
                }
            }

            // check anti diag
            if(x + y === 2) {
                for(let i = 0; i < 3; i++) {
                    if(this.state.board[i][2 - i] !== this.state.currentPlayer) break;
                    if(i === 2) this.setState({ gameEnd: true, message: `The winner is ${this.state.currentPlayer.toUpperCase()}` });
                }
            }
        }
    }

    render() {
        return (
            <div className="game">
                <button className="reset" onClick={this.resetBoard}>RESET</button>
                <div className="board">
                    <div onClick={() => this.handleTileClick(0, 0)} style={{ background: this.getBackground(0, 0) }} className="tile"></div>
                    <div onClick={() => this.handleTileClick(0, 1)} style={{ background: this.getBackground(0, 1) }} className="tile"></div>
                    <div onClick={() => this.handleTileClick(0, 2)} style={{ background: this.getBackground(0, 2) }} className="tile"></div>
                    <div onClick={() => this.handleTileClick(1, 0)} style={{ background: this.getBackground(1, 0) }} className="tile"></div>
                    <div onClick={() => this.handleTileClick(1, 1)} style={{ background: this.getBackground(1, 1) }} className="tile"></div>
                    <div onClick={() => this.handleTileClick(1, 2)} style={{ background: this.getBackground(1, 2) }} className="tile"></div>
                    <div onClick={() => this.handleTileClick(2, 0)} style={{ background: this.getBackground(2, 0) }} className="tile"></div>
                    <div onClick={() => this.handleTileClick(2, 1)} style={{ background: this.getBackground(2, 1) }} className="tile"></div>
                    <div onClick={() => this.handleTileClick(2, 2)} style={{ background: this.getBackground(2, 2) }} className="tile"></div>
                </div>
                <p className="message">{this.state.message}</p>
            </div>
        );
    }
}

export default Game;