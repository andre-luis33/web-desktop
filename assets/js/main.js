const windowsBtn  = document.getElementById('windows-btn')
const windowsMenu = document.getElementById('windows-menu')

windowsBtn.onclick = toggleWindowsMenu

const time = document.getElementById('time')

setInterval(function() {
   time.innerHTML = getTime()
}, 1000)

time.innerHTML = getTime()

const date = document.getElementById('date')

const dateObject   = new Date()
const currentDay   = dateObject.getDate().toString().padStart(2, '0')
const currentMonth = (dateObject.getMonth() + 1).toString().padStart(2, '0')
const currentYear  = dateObject.getFullYear()

const today = `${currentDay}/${currentMonth}/${currentYear}`

date.innerHTML = today





// ############################## EVENT LISTENERS

const btnOpenSteam  = document.querySelector('#btn-steam-taskbar')
const steamWrapper  = document.querySelector('.steam-wrapper')
const btnCloseSteam = document.querySelector('.close-steam')
const btnOpenSteamFloatingMenu = document.querySelector('#btn-steam-floating-menu')

btnOpenSteam.onclick  = openSteam
btnOpenSteamFloatingMenu.onclick  = openSteam
btnCloseSteam.onclick = closeSteam



const desktopIcons = document.querySelectorAll('.icon')

desktopIcons.forEach(icon => {

   icon.onmousedown = function(e) {
      closeFloatingMenu()
      icon.classList.add('dragging')
      window.addEventListener('mousemove', handleDrag)
   }

   icon.onmouseup = function(e) {
      // e.preventDefault()
   }

   icon.onclick = function(e) {
      
   }
})

window.onmouseup = e => {
   window.removeEventListener('mousemove', handleDrag)
   const iconDragging = document.querySelector('.icon.dragging')
   if(iconDragging)
      iconDragging.classList.remove('dragging')
}

window.onclick = e => {
   closeFloatingMenu()

   if(!windowsMenu.classList.contains('open'))
      return

   if(e.target.className == 'desktop-area') 
      closeWindowsMenu()
}


window.onkeyup = e => {
   const { key } = e
   if(key === 'Escape') {
      closeWindowsMenu()
      return
   }

   if(key === 'Meta') {
      e.preventDefault()
      toggleWindowsMenu()
      return
   }
}

const floatingMenu = document.querySelector('.floating-menu')

window.oncontextmenu = e => {
   e.preventDefault()

   const y = e.clientY
   const x = e.clientX

   floatingMenu.style.top = `${y}px`
   floatingMenu.style.left = `${x}px`
   openFloatingMenu()
   
}

const backgroundFileInput = document.querySelector('#background-input')
const backgroundImg = document.querySelector('.background-image')
const btnResetBackground = document.querySelector('#btn-reset-background')
const defaultBackgroundSrc = 'assets/img/background-skull.jfif'

backgroundFileInput.onchange = e => {
   const [file] = backgroundFileInput.files
   if(!file)
      return
   
   backgroundImg.src = URL.createObjectURL(file)
   btnResetBackground.style.display = 'block'
}


btnResetBackground.onclick = () => {
   btnResetBackground.style.display = 'none'
   backgroundImg.src = defaultBackgroundSrc
}

// ############################## FUNCTIONS


function handleDrag(e) {
   const iconDragging = document.querySelector('.icon.dragging')
   const childIndex = getChildIndex(iconDragging)

   const y = e.clientY
   const x = e.clientX

   const iconOffsetTop  = 50
   const iconOffsetLeft = (childIndex == 0 ? 0.2 : childIndex) * 150

   iconDragging.style.top  = `${y - iconOffsetTop}px`
   iconDragging.style.left = `${x - iconOffsetLeft}px`
}

function toggleWindowsMenu () {
   const isMenuOpen = windowsMenu.classList.contains('open')
   
   if(isMenuOpen) 
      closeWindowsMenu()
   else 
      openWindowsMenu()
   
}

function openWindowsMenu() {
   windowsMenu.classList.add('open')
}

function closeWindowsMenu() {
   windowsMenu.classList.remove('open')
}

function openSteam() {
   steamWrapper.classList.add('open')
   btnOpenSteam.classList.add('focus')
   closeWindowsMenu()
}

function closeSteam() {
   steamWrapper.classList.remove('open')
   btnOpenSteam.classList.remove('focus')
}

function openFloatingMenu() {
   floatingMenu.classList.add('open')
}

function closeFloatingMenu() {
   floatingMenu.classList.remove('open')
}

function getTime() {
   const date          = new Date()
   const currentHour   = date.getHours().toString().padStart(2, '0')
   const currentMinute = date.getMinutes().toString().padStart(2, '0')
   const currentSecond = date.getSeconds().toString().padStart(2, '0')

   return `${currentHour}:${currentMinute}:${currentSecond}`
}

function getChildIndex(element) {
   const parent = element.parentElement
   const icons = parent.querySelectorAll('.icon')
   
   let childIndex = 0

   for(let i in icons) {
      if(icons[i] === element) {
         childIndex = i
         break
      }
   }

   return childIndex
   
}