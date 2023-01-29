import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
const SNAKE_MOVEMENT_INTERVAL = 300;

const DIRECTION_EAST = 0;
const DIRECTION_WEST = 1;
const DIRECTION_SOUTH = 2;
const DIRECTION_NORTH = 3;

const GRID_EMPTY = 0;
const GRID_BODY = 1;
const GRID_HEAD = 2;
const GRID_FOOD = 3;

function SnakeGame() {
  // TODO: Set the initial Snake position
  const [snakeDirection, setSnakeDirection] = useState(DIRECTION_EAST);
  const [foodCount, setFoodCount] = useState(0);

  const [gameState, setGameState] = useState({
    snake: {
      head: {
        x: 4,
        y: 4,
      },
    },
    food: {
      x: Math.floor(Math.random() * 9),
      y: Math.floor(Math.random() * 9),
    },
  });

  let interval;

  function updateGameState() {
    var snake = gameState.snake;

    var snakeHead = snake.head;

    if (snakeDirection == DIRECTION_EAST) {
      snakeHead.y = (snakeHead.y + 1) % 9;
    } else if (snakeDirection == DIRECTION_WEST) {
      if (snakeHead.y - 1 >= 0) {
        snakeHead.y = snakeHead.y - 1;
      } else {
        snakeHead.y = 8;
      }
    } else if (snakeDirection == DIRECTION_SOUTH) {
      snakeHead.x = (snakeHead.x + 1) % 9;
    } else if (snakeDirection == DIRECTION_NORTH) {
      if (snakeHead.x - 1 >= 0) {
        snakeHead.x = snakeHead.x - 1;
      } else {
        snakeHead.x = 8;
      }
    }

    snake.head = snakeHead;

    var food = gameState.food;

    setGameState({
      snake: snake,
      food: food,
    });
    function createNode(x, y, direction) {
      var node = {};
      node.next = null;
      node.prev = null;
      node.x = x;
      node.y = y;
      node.direction = direction;
      return node;
    }

    function updateGrid(grid, snake) {
      var x = snake.head.x;
      var y = snake.head.y;
      grid[x][y] = GRID_HEAD;
      var currentNode = snake.head.next;
      while (currentNode !== null) {
        x = currentNode.x;
        y = currentNode.y;
        grid[x][y] = GRID_BODY;
        currentNode = currentNode.next;
      }
    }
    if (snakeHead.x === food.x && snakeHead.y === food.y) {
      setFoodCount(foodCount + 1);
      food.x = Math.floor(Math.random() * 9);
      food.y = Math.floor(Math.random() * 9);
    }
  }

  function Draw() {
    var board = Array(9)
      .fill(0)
      .map((row) => new Array(9).fill(0));
    var snakeHead = gameState.snake.head;
    var food = gameState.food;
    board[snakeHead.x][snakeHead.y] = GRID_HEAD;
    board[food.x][food.y] = GRID_FOOD;

    return (
      <>
        <View style={{ flex: 1 }}>
          {board.map((row, rowIndex) => {
            return (
              <View style={styles.gridRow} key={rowIndex}>
                {row.map((item, itemIndex) => {
                  if (item === GRID_EMPTY) {
                    return (
                      <View style={styles.gridItemEmpty} key={itemIndex}></View>
                    );
                  } else if (item === GRID_BODY) {
                    return (
                      <View style={styles.gridItemBody} key={itemIndex}></View>
                    );
                  } else if (item === GRID_HEAD) {
                    return (
                      <View style={styles.gridItemHead} key={itemIndex}></View>
                    );
                  } else {
                    return (
                      <View style={styles.gridItemFood} key={itemIndex}></View>
                    );
                  }
                })}
              </View>
            );
          })}
        </View>
      </>
    );
  }

  useEffect(() => {
    interval = setInterval(() => {
      updateGameState();
    }, SNAKE_MOVEMENT_INTERVAL);
    return () => clearInterval(interval);
  }, [gameState, snakeDirection]);

  return (
    <>
      <View style={styles.dropMoney}>
        <View style={styles.drop}></View>
        <View style={styles.money}></View>
      </View>

      <Text style={styles.titlePosition}> Snake Game 🐍</Text>

      <View style={styles.outercontainer}>
        <View style={styles.box}>{Draw()}</View>
        <Text>Food count: {foodCount}</Text>
        <View style={styles.arrowContainer}>
          <View style={styles.arrowUpContainer}>
            <TouchableOpacity
              onPress={() => {
                setSnakeDirection(DIRECTION_NORTH);
              }}
              style={{ alignItems: 'center' }}>
              <Image
                style={styles.arrowImage}
                source={require('../assets/arrow.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.arrowDownContainer}>
            <TouchableOpacity
              onPress={() => {
                setSnakeDirection(DIRECTION_SOUTH);
              }}
              style={{ alignItems: 'center' }}>
              <Image
                style={styles.arrowImage}
                source={require('../assets/arrow.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.arrowLeftContainer}>
            <TouchableOpacity
              onPress={() => {
                setSnakeDirection(DIRECTION_WEST);
              }}
              style={{ alignItems: 'center' }}>
              <Image
                style={styles.arrowImage}
                source={require('../assets/arrow.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.arrowRightContainer}>
            <TouchableOpacity
              onPress={() => {
                setSnakeDirection(DIRECTION_EAST);
              }}
              style={{ alignItems: 'center' }}>
              <Image
                style={styles.arrowImage}
                source={require('../assets/arrow.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  outercontainer: {
    flex: 1,
    position: 'relative',
    left: 20,
    top: 20,

    //justifyContent: 'center'
  },
  box: {
    width: 300,
    height: 300,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'red',
    borderStyle: 'solid',
    //justifyContent: 'center'
    marginLeft: 30,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
  },
  gridItemEmpty: {
    flex: 1,
    margin: 1,
    backgroundColor: 'black',
  },
  gridItemBody: {
    flex: 1,
    margin: 1,
    backgroundColor: 'white',
  },
  gridItemHead: {
    flex: 1,
    margin: 1,
    backgroundColor: 'yellow',
  },
  gridItemFood: {
    flex: 1,
    margin: 1,
    backgroundColor: 'red',
  },
  money: {
    //paddingBottom: 200,
    marginLeft: 20,
    marginTop: -60,
    marginBottom: 70,
    /*position: 'relative',
    bottom: 70,*/
  },
  dropMoney: {
    //marginBottom: 10,
    backgroundColor: '',
    //height: 180
  },
  drop: {
    marginTop: 40,
    marginLeft: 225,
    /*position: 'relative',
    top: 10,
    left: 230*/
  },
  titlePosition: {
    /*position: 'relative',
    bottom: 20,
    right: 60,*/

    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  arrowContainer: {
    width: 100,
    height: 100,
    marginLeft: 130,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 45,
    flexDirection: 'row',
  },
  arrowUpContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: 25,
    transform: [{ rotate: '90deg' }],
  },
  arrowLeftContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 25,
    left: -20,
    transform: [{ rotate: '0deg' }],
  },
  arrowDownContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 70,
    left: 25,
    transform: [{ rotate: '270deg' }],
  },
  arrowRightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 25,
    left: 70,
    transform: [{ rotate: '180deg' }],
  },
  arrowImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
export default SnakeGame;