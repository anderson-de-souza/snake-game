// html elements
var canvas
var areaScore
var appleNumberElement
var areaInfoGameOver
var buttonYesFromAreaInfoGameOver
var buttonExitFromAreaInfoGameOver


// canvas
var context

// screen size scalling
const squareSize = 4
const squareQuantity = 25

// game status
var loopReference
var appleNumber = 0
var snakeMoving = false
const trail = new Array()
var tail = 5
const speed = 1
const velocity = {
  x: 0,
  y: 0
}

// position of the snake head
const position = {
  x: Math.floor(Math.random() * squareQuantity),
  y: Math.floor(Math.random() * squareQuantity)
}
  
const apple = {
  x: Math.floor(Math.random() * squareQuantity),
  y: Math.floor(Math.random() * squareQuantity)
}

window.onload = () => {
  
  canvas = document.getElementById('stage')
  areaScore = document.querySelector('.area-score')
  appleNumberElement = document.querySelector('#apple-number')
  areaInfoGameOver = document.querySelector('.area-info-game-over')
  curtainInfoGameOver = document.querySelector('.curtain-info-game-over')
  buttonYesFromAreaInfoGameOver = document.getElementById('button-yes-area-info-game-over')
  buttonExitFromAreaInfoGameOver = document.getElementById('button-exit-area-info-game-over')

  context = canvas.getContext('2d')
  
  loopReference = setInterval(loop, 1000 / 5)
  
  addEventListener('keydown', moveSnake)

  addEventListener('resize', onResizeScreen)
  
  onResizeScreen()
  
}

function onResizeScreen() {

  if (innerWidth > innerHeight) {
    canvas.style.width = '55vh'
    canvas.style.height = '55vh'
  } else {
    canvas.style.width = '55vw'
    canvas.style.height = '55vw'
  }
   
  areaScore.style.width = getComputedStyle(canvas).width
  areaScore.style.display = 'block'

}

  
function loop() {
  
  position.x += velocity.x
  position.y += velocity.y
    
  if (position.x < 0) {
    position.x = squareQuantity - 1
  } else if (position.x > squareQuantity - 1) {
    position.x = 0
  }
    
  if (position.y < 0) {
    position.y = squareQuantity - 1
  }else if (position.y > squareQuantity - 1) {
    position.y = 0
  }
    
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)
    
  context.fillStyle = 'red'
  context.fillRect(apple.x * squareSize, apple.y * squareSize, squareSize, squareSize)
  
  appleNumberElement.innerHTML = `&nbsp;= ${ appleNumber }`
  
  context.fillStyle = 'limegreen'
  
  for (const item of trail) {
      
    context.fillRect(item.x * squareSize, item.y * squareSize, squareSize, squareSize)
    
    if (!snakeMoving) {
      break
    }
    
    // if snake head position is quals another position of trail
    if (item.x === position.x && item.y === position.y) {
      
      velocity.x = velocity.y = 0
      tail = 5
      
      gameStarted = false
      clearInterval(loopReference)
      removeEventListener('keydown', moveSnake)
      
      areaInfoGameOver.style.display = 'flex'
      areaInfoGameOver.classList.add('turnOn')
      
      curtainInfoGameOver.style.display = 'block'
      curtainInfoGameOver.classList.add('turnOn')
      
      buttonYesFromAreaInfoGameOver.addEventListener('click', (event) => location.reload())
      buttonExitFromAreaInfoGameOver.addEventListener('click', (event) => close())
      
    }
      
  }
    
  trail.push({
    x: position.x,
    y: position.y
  })
    
  while (trail.length > tail) {
    trail.shift()
  }
    
  if (position.x === apple.x && position.y === apple.y) {
    
    tail++
    appleNumber++
    
    var activated = false
    var x, y;
    
    do {
      
      x = Math.floor(Math.random() * squareQuantity)
      y = Math.floor(Math.random() * squareQuantity)
      
      // check if apple is at trail
      
      inner: for (const item of trail) {
        
        if (x === item.x && y === item.y) {
          activated = true
          break inner
        }
        
        activated = false
        
      }
      
    } while (activated)
    
    apple.x = x
    apple.y = y
    
  }
    
}
  
function moveSnake(event) {
  processKey(event.key)
}

function processKey(key) {
  
  switch (key) {
    
    case 'ArrowUp':
      
      if (velocity.y === 0) {
        snakeMoving = true
        velocity.y = -speed
        velocity.x = 0
      }
      
      break
      
    case 'ArrowRight':
      
      if (velocity.x === 0) {
        snakeMoving = true
        velocity.x = speed
        velocity.y = 0
      }
      
      break
      
    case 'ArrowDown':
      
      if (velocity.y === 0) {
        snakeMoving = true
        velocity.y = speed
        velocity.x = 0
      }
      
      break
      
    case 'ArrowLeft':
      
      if (velocity.x === 0) {
        snakeMoving = true
        velocity.x = -speed
        velocity.y = 0
      }
      
      break
      
  }
    
}
