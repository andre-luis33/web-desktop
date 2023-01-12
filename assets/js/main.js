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

btnOpenSteam.onclick  = openSteam
btnCloseSteam.onclick = closeSteam



const desktopIcons = document.querySelectorAll('.icon')


desktopIcons.forEach(icon => {

   icon.onmousedown = function(e) {
      icon.classList.add('dragging')
      window.addEventListener('mousemove', handleDrag)
   }

   icon.onmouseup = function(e) {
      e.preventDefault()
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

// ############################## FUNCTIONS


function handleDrag(e) {
   const iconDragging = document.querySelector('.icon.dragging')

   const y = e.clientY
   const x = e.clientX

   iconDragging.style.top  = `${y - 50}px`
   iconDragging.style.left = `${x - 150}px`
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
}

function closeSteam() {
   steamWrapper.classList.remove('open')
}

function getTime() {
   const date          = new Date()
   const currentHour   = date.getHours().toString().padStart(2, '0')
   const currentMinute = date.getMinutes().toString().padStart(2, '0')
   const currentSecond = date.getSeconds().toString().padStart(2, '0')

   return `${currentHour}:${currentMinute}:${currentSecond}`
}
