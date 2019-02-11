import React, { Component } from 'react';
import './App.css';
import Maze from './components/Maze';

const WIDTH = 10;
const HEIGHT = 10;
const bWIDTH = 50;
const bHEIGHT = 50;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      WIDTH: WIDTH,
      HEIGHT: WIDTH,
      playerPosition: {row: 0, col: 0},
      MATRIX: [],
      ROW_MATRIX: [],
      balls: 0,
      moves: 0,
      GAME_OVER: false,
    }

    this.changePlayerLocation = this.changePlayerLocation.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

  }

  componentDidMount() {
    const promptW = parseInt(prompt("Please enter width: "));
    const iWIDTH = promptW? promptW: WIDTH;
    const promptH = parseInt(prompt("Please enter height: "));
    const iHEIGHT = promptH? promptH: HEIGHT;
    this.setState({WIDTH: iWIDTH});
    this.setState({HEIGHT: iHEIGHT});
    let theMatrix = this.getStateMatrix(iWIDTH, iHEIGHT);
    this.setState({MATRIX: theMatrix.matrix, ROW_MATRIX: theMatrix.rowMatrix});
    
    document.addEventListener('keyup', this.onKeyUp, true);
  }
  render() {
    return (
      <div className="App">
        { this.state.ROW_MATRIX.map( (row, i) => {
          return <div key={i} style={rowStyle}>{ this.display(row) }</div>
        })
        }
      </div>
    );
  }

  onKeyUp(e) {
    this.changePlayerLocation(e.keyCode);
  }

  display = row => {
    return row.map( loc => {
      return ( <Maze key={loc.index} mode={loc.mode} mWIDTH={this.state.WIDTH} mHEIGHT={this.state.HEIGHT} width={bWIDTH} height={bHEIGHT} row={loc.row} col={loc.col} /> )
    });
  }

  changePlayerLocation(key) {
    const currentLoc = this.state.playerPosition;
    const newLoc = this.newLocation(key, currentLoc);
    if(newLoc) {
      const combo = this.updateMatrix(currentLoc, newLoc);
      let moves = +this.state.moves;
      moves++;
      this.setState({
        playerPosition: newLoc,
        ROW_MATRIX: combo.newMatrix,
        balls: combo.balls,
        moves: moves
      });

      if(combo.balls === 0) {
        alert("Game over. Total moves to save the princess: " + moves);
        document.removeEventListener('keyup', this.onKeyUp, true);
        //this.setState({GAME_OVER: true});
      }
    }
  }

  updateMatrix(plo, nlo) {
    let balls = 0;
    const rMatrix = this.state.ROW_MATRIX;
    let newMatrix = rMatrix.map( row => {
      let r = [];
      for(let loc of row) {
        if(plo.row === loc.row && plo.col === loc.col) {
          loc.mode = 0;
          r.push(loc);
        } else if(nlo.row === loc.row && nlo.col === loc.col) {
          loc.mode = 2;
          r.push(loc);
        } else {
          r.push(loc);
        }

        if(loc.mode === 1) {
          balls++;
        }
      }
      return r;
    });
    return { newMatrix, balls };
  }

  newLocation(key, loc) {
    let row = +loc.row;
    let col = +loc.col;
    switch(key) {
      case LEFT:
        let newCol = col - 1;
        if(newCol < 0) {
          return null;
        }
        return {row: row, col: newCol};
      
      case UP:
        let newRow = row - 1;
        if(newRow < 0) {
          return null;
        }
        return {row: newRow, col: col};

      case RIGHT:
        let newCol1 = col + 1;
        if(newCol1 > +this.state.WIDTH - 1) {
          return null;
        }
        return {row: row, col: newCol1};

      case DOWN:
        let newRow1 = row + 1;
        if(newRow1 > +this.state.HEIGHT - 1) {
          return null;
        }
        return {row: newRow1, col: col};

      default:
        return null;
    }
  }

  getStateMatrix(width, height) {
    let matrix = [];
    let rowMatrix = [];
    let index = 0;
    const locations = this.getRandomPositions(+width * +height);
    const pLoc = locations.pop();
    for(let i = 0; i < height; i++) {
      let temp = [];
      for(let j = 0; j < width; j++) {
        let loc = locations.indexOf(index) !== -1;
        let mode = 0;
        if(index === pLoc) {
          this.setState({playerPosition: {row: i, col: j}});
          mode = 2;
        } else if(loc) {
          mode = 1;
        } else {
          mode = 0;
        }
        matrix.push({row: i, col: j, mode: mode, index: index});
        temp.push({row: i, col: j, mode: mode, index: index});
        index++;
      }
      rowMatrix.push(temp);
    }
    this.setState({balls: +locations - 1});
    return {matrix, rowMatrix};
  }

  getRandomPositions(totalPositions) {
    let randomIndices = [];
    while(randomIndices.length < +totalPositions * 0.4) {
      let index = Math.floor(Math.random() * +totalPositions);
      if(randomIndices.indexOf(index) === -1)
      randomIndices.push(index);
    }
    return randomIndices;
  }
}

const rowStyle = {
  display: 'flex',
  flexDirection: 'row'
}
export default App;
