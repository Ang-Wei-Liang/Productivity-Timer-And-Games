import React, { useState,useEffect } from 'react';
import { Text, View, Button, StyleSheet,TouchableOpacity } from 'react-native';
import MoneyTrack from './MoneyTrack';
function TicTacToe() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [player, setPlayer] = useState('O');
  const [result, setResult] = useState({ winner: 'none', state: 'none' });

function Square({ val, chooseSquare }) {
  return (
    <TouchableOpacity style={styles.square} onPress={chooseSquare}>
      <Text style={styles.squareText}>{val}</Text>
    </TouchableOpacity>
  );
}
 const Patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
  useEffect(() => {
    checkWin();
    checkIfTie();

    if (player == 'X') {
      setPlayer('O');
    } else {
      setPlayer('X');
    }
  }, [board]);

  useEffect(() => {
    if (result.state != 'none') {
      alert(`Game Finished! Winning Player: ${result.winner}`);
      restartGame();
    }
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if (idx == square && val == '') {
          return player;
        }

        return val;
      })
    );
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == '') return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: 'Won' });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == '') {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: 'No One', state: 'Tie' });
    }
  };

  const restartGame = () => {
    setBoard(['', '', '', '', '', '', '', '', '']);
    setPlayer('O');
  };

  return(
     


    <View style={styles.box}>
    
    <View style={styles.money}>
          <MoneyTrack />
        </View>

        <Text style={styles.titlePosition}> Tic Tac Toe  🎯</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          <Square
            val={board[0]}
            chooseSquare={() => {
              chooseSquare(0);
            }}
          />
          <Square
            val={board[1]}
            chooseSquare={() => {
              chooseSquare(1);
            }}
          />
          <Square
            val={board[2]}
            chooseSquare={() => {
              chooseSquare(2);
            }}
          />
        </View>
        <View style={styles.row}>
          <Square
            val={board[3]}
            chooseSquare={() => {
              chooseSquare(3);
            }}
          />
          <Square
            val={board[4]}
            chooseSquare={() => {
              chooseSquare(4);
            }}
          />
          <Square
            val={board[5]}
            chooseSquare={() => {
              chooseSquare(5);
            }}
          />
        </View>
        <View style={styles.row}>
          <Square
            val={board[6]}
            chooseSquare={() => {
              chooseSquare(6);
            }}
          />
          <Square
            val={board[7]}
            chooseSquare={() => {
              chooseSquare(7);
            }}
          />
          <Square
            val={board[8]}
            chooseSquare={() => {
              chooseSquare(8);
            }}
          />
        </View>
      </View>
      <View style={styles.restartButton}>
        <Button
          title="Restart"
          onPress={restartGame}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    money: {
    //paddingBottom: 200,
    marginRight: 100,
    marginBottom: 85,
    /*position: 'relative',
    bottom: 70,*/
  },
titlePosition: {
    /*position: 'relative',
    bottom: 20,
    right: 60,*/

    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },

box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#ecf0f1'
  },
  board: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'black',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareText: {
    fontSize: 60,
  },
  restartButton: {
    marginTop: 40,
  },
});

export default TicTacToe;