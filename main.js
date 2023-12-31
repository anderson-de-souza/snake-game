
var canvas;
var ctx;

var loopReference;

var snakeMoving = false;

const squareSize = 4
const squareQuantity = 25

var appleNumber = 0
var appleNumberElement
  
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
  ctx = canvas.getContext('2d')
  
  loopReference = setInterval(loop, 1000 / 5)
  
  addEventListener('keydown', moveSnake)
  
  if (innerWidth > innerHeight) {
    canvas.style.width = '75vh'
    canvas.style.height = '75vh'
  } else {
    canvas.style.width = '75vw'
    canvas.style.height = '75vw'
  }
  
  const areaScore = document.querySelector('.area-score')
  areaScore.style.width = getComputedStyle(canvas).width
  areaScore.style.display = 'block'
  
  appleNumberElement = document.querySelector('#apple-number')
  
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
    
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
    
  ctx.fillStyle = 'red'
  ctx.fillRect(apple.x * squareSize, apple.y * squareSize, squareSize, squareSize)
  
  appleNumberElement.innerHTML = `&nbsp;= ${ appleNumber }`
  
  ctx.fillStyle = 'limegreen'
  
  for (const item of trail) {
      
    ctx.fillRect(item.x * squareSize, item.y * squareSize, squareSize, squareSize)
    
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
      
      const areaInfoGameOver = document.querySelector('.area-info-game-over')
      areaInfoGameOver.style.display = 'flex'
      areaInfoGameOver.classList.add('turnOn')
      
      const curtainInfoGameOver = document.querySelector('.curtain-info-game-over')
      curtainInfoGameOver.style.display = 'block'
      curtainInfoGameOver.classList.add('turnOn')
      
      const buttonYesFromAreaInfoGameOver = document.getElementById('button-yes-area-info-game-over')
      buttonYesFromAreaInfoGameOver.addEventListener('click', (event) => location.reload())

      const buttonExitFromAreaInfoGameOver = document.getElementById('button-exit-area-info-game-over')
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
  moveSnake(event.key)
}

function moveSnake(key) {
  
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
