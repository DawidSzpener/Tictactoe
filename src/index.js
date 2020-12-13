import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/Board'
import './index.scss';
import Ximage from './assets/images/X.png'
import Yimage from './assets/images/Y.png'

class Game extends React.Component {

  state = {
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
  };

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(squares[a] !== null && squares[b] !== null && squares[c] !== null) {
        if (squares[a].props.alt && squares[a].props.alt === squares[b].props.alt && squares[a].props.alt === squares[c].props.alt) {
          return squares[a];
        }
      }

    }
    return null
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const X = <img alt="X" src={Ximage}/>
    const Y = <img alt="Y" src={Yimage}/>
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? X : Y;
    this.setState({ 
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to start';
      return (
        <li key={move} className="game__li">
          <button className="game__button" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner is: " + winner.props.alt;
    } else {
      status = "Next player is: " + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game__status">{status}</div>
        <Board
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
        />
        <div className="game__info">
          <ol className="game__ol">{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
