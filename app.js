let roomIds = ['🥥', '🍖', '🍹', '🌴']

let animals = [
  {
    name: 'Oslo',
    emoji: '🦧',
    diet: 'Fruits',
    weapons: 'Limbs',
    mammal: true,
    alive: true,
    room: '🥥'
  },
  {
    name: 'Xanther',
    emoji: '🦈',
    alive: true,
    diet: 'Meats',
    weapons: 'Teeth',
    mammal: false,
    room: '🍖'
  },
  {
    name: 'Justin',
    emoji: '🐖',
    alive: true,
    diet: 'Veggies',
    weapons: 'Limbs',
    mammal: true,
    room: '🍹'
  },
  {
    name: 'Wendy',
    emoji: '🦇',
    alive: true,
    diet: 'Fruits',
    weapons: 'Teeth',
    mammal: true,
    room: '🌴'
  },
  {
    name: 'Raymond',
    emoji: '🐘',
    alive: true,
    diet: 'Fruits',
    weapons: 'Limbs',
    mammal: true,
    room: '🌴'
  },
  {
    name: 'Gerald',
    emoji: '🦍',
    alive: true,
    diet: 'Meats',
    weapons: 'Limbs',
    mammal: true,
    room: '🥥'
  },
]

let murderersName = ''

const lineup = document.getElementById('lineup')

function drawAllAnimals() {
  // let animalsToDraw = ''
  // for (let i = 0; i < animals.length; i++) {
  //   const animal = animals[i];
  //   animalsToDraw += animal.emoji
  // }
  // lineup.innerText = animalsToDraw
  drawTheseAnimals(animals)
}


function drawTheseAnimals(animalArr) {
  let animalsToDraw = ''
  animalArr.forEach(animal => {
    animalsToDraw += animal.emoji
  })
  lineup.innerText = animalsToDraw
}

function drawAliveAnimals() {
  let alive = animals.filter(animal => animal.emoji != '☠️')
  drawTheseAnimals(alive)
}

function drawRooms() {
  roomIds.forEach(room => {
    let animalsInRoom = animals.filter(a => a.room == room)
    let animalEmojis = animalsInRoom.map(a => a.emoji)
    document.getElementById(room).innerText = animalEmojis.join(' ')
  })
}

function moveAnimals() {
  animals.forEach(animal => {
    if (animal.alive) {
      let randomIndex = Math.floor(Math.random() * roomIds.length)
      animal.room = roomIds[randomIndex]
    }
  })
  drawRooms()
}

function selectMurderer() {
  let randomIndex = Math.floor(Math.random() * animals.length)
  murderersName = animals[randomIndex].name
  console.log(murderersName)
}

function commitCrime() {
  let murderer = animals.find(a => a.name == murderersName)
  let withMurderer = animals.filter(a => a.room == murderer.room && a.name != murderersName && a.alive)

  console.log(withMurderer)
  if (withMurderer.length == 1) {
    let victim = withMurderer[0]
    console.log('murdering', victim)
    victim.alive = false
  }
  checkForLose()
}

function accuse() {
  let guess = window.prompt('Who dun it?')
  let murderer = animals.find(a => a.name == murderersName)
  if (guess == murderer.emoji) {
    window.alert('You found the murderer!')
  } else {
    addMessage('You wrongly accused an animal ' + guess)
    passTime()
  }
}

function checkForLose() {
  let allDead = animals.every(a => a.name == murderersName || a.alive == false)
  if (allDead) {
    window.alert('All the animals were killed, good job detective!')
    let murderer = animals.find(a => a.name == murderersName)
    addMessage(`everyone is dead, it was ${murderersName} ${murderer.emoji}`)
  }
}

function search(room) {
  // console.log('You search the', room)
  addMessage('You search the room ...🔍')
  let deadInRoom = animals.filter(a => !a.alive && a.emoji != '☠️' && room == a.room)
  if (deadInRoom.length) {
    deadInRoom.forEach(da => {
      // console.log('You found a dead body!', deadInRoom)
      addMessage('You found a dead body! ' + da.emoji)
      da.emoji = '☠️'
      drawAliveAnimals()
      let clues = ['mammal', 'diet', 'weapons']
      let clue = clues[Math.floor(Math.random() * clues.length)]
      let murderer = animals.find(a => a.name == murderersName)
      switch (clue) {
        case 'mammal':
          addMessage(`You find hair left on the victim`)
          // console.log(`You find hair left on the victim`)
          break;
        case 'diet':
          addMessage(`You find scraps of ${murderer.diet}`)
          // console.log(`You find scraps of ${murderer.diet}`)
          break;
        case 'weapons':
          addMessage(`The victim was murdered using ${murderer.weapons}`)
          // console.log(`The victim was murdered using ${murderer.weapons}`)
          break;
        // default: console.log('you find nothing...')
      }
    })
  } else {
    addMessage('You find nothing 🤷')
  }
  passTime()
}

function passTime() {
  moveAnimals()
  commitCrime()
}

function addMessage(message) {
  document.getElementById('messages').innerHTML += `<p>${message}</p>`
}


// Runs on loadpage
addMessage('there is a murderer a foot...')
selectMurderer()
drawAllAnimals()
drawRooms()