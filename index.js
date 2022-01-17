// (function () {
let player1Field = document.querySelector('#player_1') // Поле красного игрока
let player2Field = document.querySelector('#player_2') // Поле синего игрока

let shipParts1 = document.getElementsByClassName('unit-cell red-cell')
let shipParts2 = document.getElementsByClassName('unit-cell blue-cell')

let allWhiteCells1 = [...player1Field.getElementsByClassName('unit-cell white-cell')]
let allWhiteCells2 = [...player2Field.getElementsByClassName('unit-cell white-cell')]

let whoseTurn = document.getElementById('whose-turn')


let addAndField1 = document.getElementById('aaf-1')
let addAndField2 = document.getElementById('aaf-2')

let addInRedBtn = document.getElementById('add-in-red')
let addInBlueBtn = document.getElementById('add-in-blue')

let redReady = document.getElementById('ready-red')
let blueReady = document.getElementById('ready-blue')

let redIsReady
let blueIsReady

let doesntShowRedShipsForHand = document.getElementById('doesnt-see-ships-red' )
let doesntShowBlueShipsForHand = document.getElementById('doesnt-see-ships-blue')

let selfPlacementRed = document.getElementById('self-placement-red')
let selfPlacementBlue = document.getElementById('self-placement-blue')

let start = document.getElementById('start')

let newShip = [...document.getElementsByClassName('usual-ship')]


let redRandom
let blueRandom

let sideLen = 10

// let rand = () => {
//     let sideLen = Math.floor(Math.random() * (12 - 4 + 1) + 4);
//     arrField(sideLen)
// }

// const unit = document.createElement('div')
// unit.className = 'unit-cell'

selfPlacementRed.addEventListener('click', () => {
    doesntShowRedShipsForHand.remove()
    addInRedBtn.remove()
    selfPlacementRed.remove()
    redRandom = 0
})

selfPlacementBlue.addEventListener('click', () => {
    doesntShowBlueShipsForHand.remove()
    addInBlueBtn.remove()
    selfPlacementBlue.remove()
    blueRandom = 0
})

function event (elem, addAndField, addAndField_2, color) { // Исходный onClick для белых клеток
    elem.className = 'unit-cell grey-cell'
    whoseTurn.innerText = `Мимо. Теперь ходит ${color}`
    let curtain = document.querySelector('.curtain')
    console.log(curtain)
    // else console.log(321)
    if (addAndField.removeChild(curtain)) console.log(123)
    else console.log(321)
    let newCertain = document.createElement('div')
    newCertain.className='curtain'
    addAndField_2.insertAdjacentElement('afterbegin', newCertain)
    elem.removeEventListener('click', event)
}

let addShipsInField1 = (sideLen) => {
    let arr = [...Array(sideLen)].map(() => Array(sideLen).fill(0))
    for (let i = 3; i >= 0; i--) { // Создание всех кораблей

        let shipType = ships[i]

        for (let i = 0; i < shipType.number; i++) { // Создание кораблей одного типа

            let trueArea = 0

            while (trueArea < 6 + 3 * shipType.size) { // Проверка на соприкасаемость потенциального корабля с уже добавленными на поле

                let shipDirection = Math.round(Math.random()), // Номер оси корабля
                    getShip = shipType.directions[shipDirection], // Координаты корабля
                    randPosX = shipDirection === 1 ? Math.round(Math.random() * (sideLen - parseInt(shipType.size) - 1)) : Math.round(Math.random() * (sideLen - 1)), // Смещение по горизонтали
                    randPosY = shipDirection === 0 ? Math.round(Math.random() * (sideLen - parseInt(shipType.size) - 1)) : Math.round(Math.random() * (sideLen - 1)), // Смещение по вертикали
                    areaPlace = [],
                    shipArea = shipType.area[parseInt(getShip)] // Координаты окружения корабля


                for (let o = 0; o < shipArea.length; o++) { // Генерация массива с координатами точек из исходного
                    let miniArr = []
                    miniArr.push(shipArea[o][0] + parseInt(randPosX))
                    miniArr.push(shipArea[o][1] + parseInt(randPosY))
                    areaPlace.push(miniArr)
                }

                // console.log(`areaPlace: ${areaPlace}`)

                for (let n = 0; n < areaPlace.length; n++) {
                    if (areaPlace[n][0] === -1 || areaPlace[n][0] === 10) {
                        trueArea += 1
                        // console.log(areaPlace[n][0])
                    } else if (arr[areaPlace[n][0]][areaPlace[n][1]] === 0) {
                        trueArea += 1
                        // console.log(123)
                    }
                }

                if (trueArea === 6 + 3 * shipType.size) { // Проварка на касание кораблей
                    for (let i = 0; i < shipType.size; i++) { // Создание 1 корабля

                        if (getShip.length === 1) {
                            arr[parseInt(randPosX)][parseInt(randPosY)] = 1
                        } else {
                            for (let i = 0; i < getShip.length; i++) {
                                arr[getShip[i][0] + parseInt(randPosX)][getShip[i][1] + parseInt(randPosY)] = 1
                            }
                        }
                    }
                } else {
                    trueArea = 0
                }
                // console.log(trueArea)
            }
        }
    }

    for (let i = 0; i < sideLen; i++) { // Добавление кораблей на поле
        for (let j = 0; j < sideLen; j++) {

            const unit = document.createElement('div')
            unit.className = 'unit-cell white-cell'
            let idF = `${i}${j}F`
            unit.id = idF
            if (arr[i][j] === 1) {
                unit.className = 'unit-cell red-cell'
                let event1 = () => {
                    unit.className = 'unit-cell red-cell'
                    whoseTurn.innerText = 'В точку! Так держать!'
                    if (shipParts1.length>19) {
                        setTimeout(() => alert('Победил синий игрок, обновите страницу'), 50)
                    }
                    unit.removeEventListener('click', event1)
                }
                unit.addEventListener('click', event1)
            } else {
                unit.addEventListener('click', () => event(unit, addAndField2, addAndField1, 'красный'))
            }

            player1Field.appendChild(unit)
        }
    }
}

let addShipsInField2 = (sideLen) => {
    let arr2 = [...Array(sideLen)].map(() => Array(sideLen).fill(0))





    for (let i = 3; i >= 0; i--) { // Создание всех кораблей

        let shipType = ships[i]

        for (let i = 0; i < shipType.number; i++) { // Создание кораблей одного типа

            let trueArea = 0

            while (trueArea < 6 + 3 * shipType.size) { // Проверка на соприкасаемость потенциального корабля с уже добавленными на поле

                let shipDirection = Math.round(Math.random()), // Номер оси корабля
                getShip = shipType.directions[shipDirection], // Координаты корабля
                randPosX = shipDirection === 1 ? Math.round(Math.random() * (sideLen - parseInt(shipType.size) - 1)) : Math.round(Math.random() * (sideLen - 1)), // Смещение по горизонтали
                randPosY = shipDirection === 0 ? Math.round(Math.random() * (sideLen - parseInt(shipType.size) - 1)) : Math.round(Math.random() * (sideLen - 1)), // Смещение по вертикали
                areaPlace = [],
                shipArea = shipType.area[parseInt(getShip)] // Координаты окружения корабля


                for (let o = 0; o < shipArea.length; o++) { // Генерация массива с координатами точек из исходного
                    let miniArr = []
                    miniArr.push(shipArea[o][0] + parseInt(randPosX))
                    miniArr.push(shipArea[o][1] + parseInt(randPosY))
                    areaPlace.push(miniArr)
                }

                // console.log(`areaPlace: ${areaPlace}`)

                for (let n = 0; n < areaPlace.length; n++) {
                    if (areaPlace[n][0] === -1 || areaPlace[n][0] === 10) {
                        trueArea += 1
                        // console.log(areaPlace[n][0])
                    } else if (arr2[areaPlace[n][0]][areaPlace[n][1]] === 0) {
                        trueArea += 1
                        // console.log(123)
                    }
                }

                if (trueArea === 6 + 3 * shipType.size) { // Проварка на касание кораблей
                    for (let i = 0; i < shipType.size; i++) { // Создание 1 корабля

                        if (getShip.length === 1) {
                            arr2[parseInt(randPosX)][parseInt(randPosY)] = 1
                        } else {
                            for (let i = 0; i < getShip.length; i++) {
                                arr2[getShip[i][0] + parseInt(randPosX)][getShip[i][1] + parseInt(randPosY)] = 1
                            }
                        }
                    }
                } else {
                    trueArea = 0
                }
                // console.log(trueArea)
            }
        }
    }

        for (let i = 0; i < sideLen; i++) { // Добавление кораблей на поле
            for (let j = 0; j < sideLen; j++) {



                const unit2 = document.createElement('div')
                unit2.className = 'unit-cell white-cell'
                let idS = `${i}${j}S`
                unit2.id = idS
                if (arr2[i][j] === 1) {
                    unit2.className = 'unit-cell blue-cell'
                    let event2 = () => {
                        unit2.className = 'unit-cell blue-cell'
                        whoseTurn.innerText = 'В точку! Так держать!'
                        if (shipParts2.length>19) {
                            setTimeout(() => alert('Победил красный игрок, обновите страницу'), 50)
                        }
                        unit2.removeEventListener('click', event2)
                    }
                    unit2.addEventListener('click', event2)
                } else {
                    unit2.addEventListener('click', () => event(unit2, addAndField1, addAndField2, 'синий'))
                }
                player2Field.appendChild(unit2)
            }
        }
}

addInRedBtn.addEventListener('click', () => { // Добавление кораблей на красное поле случайным образом
    player1Field.innerHTML = ''
    addShipsInField1(10)
    selfPlacementRed.remove()
    redRandom = 1
})

addInBlueBtn.addEventListener('click', () => { // Добавление кораблей на синее поле случайным образом
    player2Field.innerHTML = ''
    addShipsInField2(10)
    selfPlacementBlue.remove()
    blueRandom = 1
})


start.addEventListener('click', () => { // Событие при клике на Start
    if (redIsReady===1&&blueIsReady===1) {
        whoseTurn.innerText='Поехали! Начинает красный!'
        allWhiteCells2.forEach(item => {
            item.addEventListener('click', () => event(item, addAndField1, addAndField2, 'красный'))
        })
        allWhiteCells1.forEach(item => {
            item.addEventListener('click', () => event(item, addAndField2, addAndField1, 'синий'))
        })
        let curtain = addAndField2.querySelector('.curtain')
        addAndField2.removeChild(curtain)

        addInRedBtn.remove()
        selfPlacementRed.remove()
        addInBlueBtn.remove()
        selfPlacementBlue.remove()
        redReady.remove()
        blueReady.remove()

    } else {
        alert('Сперва расставьте корабли')
    }

})


// let readyGame = () => { // Корабли расставлены, игроки готовы
//     if (redIsReady===1&&blueIsReady===1) {
//         whoseTurn.innerText='Поехали! Начинает красный!'
//         allWhiteCells1.forEach(item => {
//             item.addEventListener('click', () => event(item, addAndField1, addAndField2, 'красный'))
//         })
//         allWhiteCells2.forEach(item => {
//             item.addEventListener('click', () => event(item, addAndField2, addAndField1, 'синий'))
//         })
//     } else {
//         console.log('Error')
//     }
// }

redReady.addEventListener('click', () => { // Создание исходных клеток красного поля, а также проверка на заполненность кораблями при помощи рандома

    redIsReady = 1
    // readyGame()

    let curtain = addAndField1.querySelector('.curtain')
    if (curtain) addAndField1.removeChild(curtain)
    let newCertain = document.createElement('div')
    newCertain.className='curtain'
    addAndField1.insertAdjacentElement('afterbegin', newCertain)


    if (redRandom !== 1) {
        console.log('redRandom: ', redRandom)
        let allWhiteCellsOfPlayer1 = [...player1Field.getElementsByClassName('white-cell')]
        allWhiteCellsOfPlayer1.forEach(item => {
            item.addEventListener('click', () => event(item, addAndField2, addAndField1, 'синий'))
        })
    }


    let redsHands=[...document.getElementsByClassName('red-cell')]
    redsHands.forEach(item => {
        // item.className = 'unit-cell red-cell'
        let eventRed = () => {
            item.className = 'unit-cell red-cell red hand-placed'
            let redsHandsAfterReady = [...document.getElementsByClassName('red-cell')]
            console.log("redsHandsAfterReady", redsHandsAfterReady)
            whoseTurn.innerText = 'В точку! Так держать!'
            if (redsHandsAfterReady.length > 19) {
                setTimeout(() => alert('Победил синий игрок, обновите страницу'), 50)
            }
            item.removeEventListener('click', eventRed)
        }
        item.parentNode.onmousedown = null
        item.parentNode.onmouseup = null
        item.parentNode.onmousemove = null
        item.padding = 0
            item.addEventListener('click', eventRed)
    })
    let qwe = [...shipParts1]
    qwe.forEach(item => item.className='unit-cell white-cell red')

    redReady.remove()
    addInRedBtn.remove()
})

blueReady.addEventListener('click', () => { // Создание исходных клеток синего поля, а также проверка на заполненность кораблями при помощи рандома

    blueIsReady = 1
    // readyGame()

    let curtain = addAndField2.querySelector('.curtain')
    if (curtain) addAndField2.removeChild(curtain)
    let newCertain = document.createElement('div')
    newCertain.className='curtain'
    addAndField2.insertAdjacentElement('afterbegin', newCertain)

    if (blueRandom !== 1) {
        console.log('blueRandom: ', blueRandom)
        let allWhiteCellsOfPlayer2 = [...player2Field.getElementsByClassName('white-cell')]
        allWhiteCellsOfPlayer2.forEach(item => {
            item.addEventListener('click', () => event(item, addAndField1, addAndField2, 'синий'))
        })
    }



    let bluesHands=[...document.getElementsByClassName('blue-cell')]
    bluesHands.forEach(item => {
        let eventBlue = () => {
            item.className = 'unit-cell blue-cell blue hand-placed'
            let bluesHandsAfterReady=[...document.getElementsByClassName('blue-cell')]
            console.log("bluesHandsAfterReady", bluesHandsAfterReady)
            whoseTurn.innerText = 'В точку! Так держать!'
            if (bluesHandsAfterReady.length>19) {
                setTimeout(() => alert('Победил красный игрок, обновите страницу'), 50)
            }
            item.removeEventListener('click', eventBlue)
        }
        item.parentNode.onmousedown = null
        item.parentNode.onmouseup = null
        item.parentNode.onmousemove = null
        item.padding=0
            item.addEventListener('click', eventBlue)

    })
    let qwe = [...shipParts2]
    qwe.forEach(item => item.className='unit-cell white-cell blue')

    blueReady.remove()
    addInBlueBtn.remove()
})

function mouseDown (item, number, event) {  // Событие при нажатии левой кнопки, и при нажатии левой кнопки + shift

    if (event.which === 1 && event.shiftKey) {
        for (let i = 0; i < number; i++) {
            if (item.className === `usual-ship ship-${i}`) {
                item.style.transform = item.style.transform === `rotate(90deg) translate(${22 * (i - 1)}px, ${22 * (i - 1)}px)`
                                    ? null
                                    : `rotate(90deg) translate(${22 * (i - 1)}px, ${22 * (i - 1)}px)`
            }
        }
    }

    let shiftX = event.clientX - item.getBoundingClientRect().left
    let shiftY = event.clientY - item.getBoundingClientRect().top

    item.style.position = 'absolute'
    item.style.zIndex = 100
    document.body.append(item)

    moveAt(event.pageX, event.pageY)

    function moveAt(pageX, pageY) {  // переносит корабль на координаты (pageX, pageY), дополнительно учитывая изначальный сдвиг относительно указателя мыши

        item.style.left = pageX - shiftX + 'px'
        item.style.top = pageY - shiftY + 'px'
    }



    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY)
    }

    document.addEventListener('mousemove', onMouseMove)  // передвигаем корабль при событии mousemove


    item.onmouseup = function (event) {     // отпустить корабль, удалить ненужные обработчики


        document.removeEventListener('mousemove', onMouseMove)
        item.onmouseup = null

        item.style.top = Math.round((event.pageY - shiftY) / 44)*44 +1 + 'px'



        if ([...item.getElementsByClassName('red')].length>0) {
            item.style.left = Math.round((event.pageX - shiftX) / 44)*44 - 13 + 'px'
        } else if ([...item.getElementsByClassName('blue')].length>0) {
            item.style.left = Math.round((event.pageX - shiftX) / 44)*44 - 31 + 'px'
        }
    }

}



let movingShips = (item, number=5) => {
    item.onmousedown = (event) => mouseDown(item, number, event)

    item.ondragstart = function () {
        return false
    }
}

newShip.forEach(item => movingShips(item))

let startAlert = () => { // Стартовая заметка
    setTimeout(() =>  alert(
        'Добро пожаловать на игру Морской бой. \n' +
        'Расстановка кораблей вручную, либо случайным образом. \n' +
        'Кто первым уничтожит все корабли противника - победитель. \n' +
        'Для начала игры расставьте свои корабли, при этом они не должны соприкасаться друг с другом \n ' +
        'После окончательной расстановки кораблей на своем поле нажмите Ready\n' +
        'Когда оба игрока готовы жмите Start'
    ), 50)

}



let loadFunc = () => { // Генерация клеток по дефолту при загрузке
    for (let i = 0; i < 100; i++) {
        const unitDefault1 = document.createElement('div')
        unitDefault1.className = 'unit-cell white-cell'
        // unitDefault1.addEventListener('click', () => event(unitDefault1, addAndField1, addAndField2, 'красный'))
        player1Field.appendChild(unitDefault1)

        const unitDefault2 = document.createElement('div')
        unitDefault2.className = 'unit-cell white-cell'
        // unitDefault2.addEventListener('click', () => event(unitDefault2, addAndField2, addAndField1, 'синий'))
        player2Field.appendChild(unitDefault2)
    }
    startAlert()
}

let ships = [ // Массив данных о кораблях
    {
        name: 'l1Ship',
        size: 1,
        number: 4,
        directions: [
            [[0, 0]],
            [[0, 0]]
        ],
        area: [
            [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [-1, 0], [0, 0]],
            [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [-1, 0], [0, 0]],
        ]
    },
    {
        name: 'l2Ship',
        size: 2,
        number: 3,
        directions: [
            [[0, 0], [0, 1]],
            [[0, 0], [1, 0]]
        ],
        area: [
            [[-1, -1], [-1, 0], [-1, 1], [-1, 2], [0, 2], [1, 2], [1, 1], [1, 0], [1, -1], [0, -1], [0, 0], [0, 1]],
            [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [2, 1], [2, 0], [2, -1], [1, -1], [0, -1], [0, 0], [1, 0]],
        ]
    },
    {
        name: 'l3Ship',
        size: 3,
        number: 2,
        directions: [
            [[0, 0], [0, 1], [0, 2]],
            [[0, 0], [1, 0], [2, 0]]
        ],
        area: [
            [[-1, -1], [-1, 0], [-1, 1], [-1, 2], [-1, 3], [0, 3], [1, 3], [1, 2], [1, 1], [1, 0], [1, -1], [0, -1], [0, 0], [0, 1], [0, 2]],
            [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1], [3, 0], [3, -1], [2, -1], [1, -1], [0, -1], [0, 0], [1, 0], [2, 0]],
        ]
    },
    {
        name: 'l4Ship',
        size: 4,
        number: 1,
        directions: [
            [[0, 0], [0, 1], [0, 2], [0, 3]],
            [[0, 0], [1, 0], [2, 0], [3, 0]]
        ],
        area: [
            [[-1, -1], [-1, 0], [-1, 1], [-1, 2], [-1, 3], [-1, 4], [0, 4], [1, 4], [1, 3], [1, 2], [1, 1], [1, 0], [1, -1], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3]],
            [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [4, 0], [4, -1], [3, -1], [2, -1], [1, -1], [0, -1], [0, 0], [1, 0], [2, 0], [3, 0]],
        ]
    },
    {
        name: 'l5Ship',
        size: 5,
        number: 1,
        directions: [
            [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
            [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]
        ],
        area: [
            [[-1, -1], [-1, 0], [-1, 1], [-1, 2], [-1, 3], [-1, 4], [-1, 5], [0, 5], [1, 5], [1, 4], [1, 3], [1, 2], [1, 1], [1, 0], [1, -1], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3]],
            [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [5, 0], [5, -1], [4, -1], [3, -1], [2, -1], [1, -1], [0, -1], [0, 0], [1, 0], [2, 0], [3, 0]],
        ]
    },

]
