
var canvas;
var ctx;

window.onload = () => {
  
  canvas = document.getElementById('stage')
  ctx = canvas.getContext('2d')
  
  setInterval(game, 1000 / 5)
  
  addEventListener('keydown', (info) => moveSnake(info.key))
  
}

const squareSize = 4
const squareQuantity = 25
  
const trail = new Array()

var tail = 5
  
const speed = 1
  
const velocity = {
  x: 0,
  y: 0
}
  
const position = {
  x: Math.floor(Math.random() * squareQuantity),
  y: Math.floor(Math.random() * squareQuantity)
}
  
const apple = {
  x: Math.floor(Math.random() * squareQuantity),
  y: Math.floor(Math.random() * squareQuantity)
}
  
function game() {
  
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
    
  ctx.fillStyle = 'limegreen'
  
  for (const item of trail) {
      
    ctx.fillRect(item.x * squareSize, item.y * squareSize, squareSize, squareSize)
      
    if (item.x === position.x && item.y === position.y) {
      velocity.x = velocity.y = 0
      tail = 5
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
    
    var activated = false
    var x, y;
    
    do {
      
      x = Math.floor(Math.random() * squareQuantity)
      y = Math.floor(Math.random() * squareQuantity)
      
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
  
  

function moveSnake(key) {
  
  switch (key) {
    case 'ArrowUp':
      if (velocity.y === 0) {
        velocity.y = -speed
        velocity.x = 0
      }
      break
    case 'ArrowRight':
      if (velocity.x === 0) {
        velocity.x = speed
        velocity.y = 0
      }
      break
    case 'ArrowDown':
      if (velocity.y === 0) {
        velocity.y = speed
        velocity.x = 0
      }
      break
    case 'ArrowLeft':
      if (velocity.x === 0) {
        velocity.x = -speed
        velocity.y = 0
      }
      break
  }
    
}
