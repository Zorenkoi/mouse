const mouseBlock = document.querySelector('.slyder-line')
const body = document.querySelector('body')

const arrEl = document.querySelectorAll('.logo-item')
const goodArr = []
let nowIndexEl = 1

let zazhatie = false
let startX = 0
let smooth = 0

mouseBlock.addEventListener('mousedown', (e) => {
  zazhatie = true
  startX = e.pageX
})
mouseBlock.addEventListener('mouseup', mouseUp)
mouseBlock.addEventListener('mouseleave', mouseUp)

mouseBlock.addEventListener('mousemove', (e) => {
  if (zazhatie) {
    maybeSmooth = (e.pageX - startX) / 1.85
    if (maybeSmooth < 350 && maybeSmooth > -350) {
      smooth = maybeSmooth

      goodArr.forEach((goodObj) => {
        const space = goodObj.order * 400 - 800
        goodObj.el.style.transition = '0s'
        goodObj.el.style.left = space + smooth + 'px'
      })
    }
  }
})

function mouseUp() {
  goodArr.forEach((goodObj) => {
    goodObj.el.style.transition = 'left 0.3s'
  })

  if (smooth > -350 && smooth < -50) {
    moveLeft()
  } else if (smooth > 50 && smooth < 350) {
    moveRight()
  } else {
    destroy()
  }

  zazhatie = false
  startX = 0
  smooth = 0
}

// ///////////////////////////////////////////////////////

arrEl.forEach((el, i) => {
  const newObj = { order: i, el }
  goodArr.push(newObj)
})

function destroy(v) {
  goodArr.forEach((goodObj) => {
    goodObj.el.style.opacity = '1'
    goodObj.el.classList.remove('active')

    if (v === 'left') {
      if (goodObj.order === goodArr.length - 1) {
        goodObj.el.style.opacity = '0'
      }
    } else if (v === 'right') {
      if (goodObj.order === 0) {
        goodObj.el.style.opacity = '0'
      }
    }

    const space = goodObj.order * 400 - 800
    goodObj.el.style.left = `${space}px`
  })
}
function destroyFirst() {
  goodArr.forEach((goodObj) => {
    goodObj.el.style.position = 'absolute'

    const space = goodObj.order * 400 - 800
    goodObj.el.style.left = `${space}px`
  })
}
destroyFirst()

function moveLeft() {
  goodArr.forEach((goodObj) => {
    if (goodObj.order === 0) {
      goodObj.order = goodArr.length - 1
    } else {
      goodObj.order -= 1
    }
  })

  destroy('left')
}
function moveRight() {
  goodArr.forEach((goodObj) => {
    if (goodObj.order === goodArr.length - 1) {
      goodObj.order = 0
    } else {
      goodObj.order += 1
    }
  })
  destroy('right')
}
