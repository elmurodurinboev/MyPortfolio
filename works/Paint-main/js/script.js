// Point
const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  fillColor = document.querySelector("#fill-color"),
  sizeSlider = document.querySelector("#size-slider"),
  colorBtns = document.querySelectorAll(".colors .option"),
  colorPicker = document.querySelector("#color-picker"),
  clearCanvasBtn = document.querySelector(".clear-canvas"),
  saveImgBtn = document.querySelector(".save-img")

let ctx = canvas.getContext("2d"),
  isDrawing = false,
  brushWith = 5,
  selectedTool = "brush",
  selectedColor,
  prevMouseY,
  prevMouseX,
  snapshot

const setCanvasBackground = () => {
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = selectedColor
}

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  setCanvasBackground()
})

const startDraw = (e) => {
  isDrawing = true
  ctx.beginPath()
  prevMouseY = e.offsetY
  prevMouseX = e.offsetX
  console.log(prevMouseX, prevMouseY)
  ctx.strokeStyle = selectedColor
  ctx.fillStyle = selectedColor
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

const drawRectangle = (e) => {
  fillColor.checked
    ? ctx.fillRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetY,
      )
    : ctx.strokeRect(
        e.offsetX,
        e.offsetY,
        prevMouseX - e.offsetX,
        prevMouseY - e.offsetY,
      )
}

const drawCircle = (e) => {
  ctx.beginPath()
  const radius =
    Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) +
    Math.sqrt(Math.pow(prevMouseY - e.offsetY, 2))
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
  fillColor.checked ? ctx.fill() : ctx.stroke()
}

const drawTriangle = (e) => {
  ctx.beginPath()
  ctx.moveTo(prevMouseX, prevMouseY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
  ctx.closePath()
  fillColor.checked ? ctx.fill() : ctx.stroke()
}

const drawBrush = (e) => {
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
}

const drawing = (e) => {
  if (!isDrawing) return
  ctx.putImageData(snapshot, 0, 0)
  switch (selectedTool) {
    case "brush":
      drawBrush(e)
      break

    case "rectangle":
      drawRectangle(e)
      break

    case "circle":
      drawCircle(e)
      break

    case "triangle":
      drawTriangle(e)
      break

    case "earser":
      ctx.strokeStyle = "#fff"
      drawBrush(e)
      break

    default:
      break
  }
  ctx.lineWidth = brushWith
}
sizeSlider.addEventListener("change", () => (brushWith = sizeSlider.value))

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .selected").classList.remove("selected")
    btn.classList.add("selected")
    const bgColor = window
      .getComputedStyle(btn)
      .getPropertyValue("background-color")
    selectedColor = bgColor
    console.log(selectedColor)
  })
})

colorPicker.addEventListener("change", () => {
  colorPicker.parentElement.style.backgroundColor = colorPicker.value
  colorPicker.parentElement.click()
})

clearCanvasBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  setCanvasBackground()
})

saveImgBtn.addEventListener("click", () => {
  const link = document.createElement("a")
  link.download = `Elmurod-paint${Date.now()}.jpg`
  link.href = canvas.toDataURL()
  link.click()
})

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active")
    btn.classList.add("active")
    selectedTool = btn.id
    console.log(btn.id)
  })
})

const stopDraw = () => {
  isDrawing = false
}
canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", stopDraw)
