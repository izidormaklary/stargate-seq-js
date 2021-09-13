let rows1 = Array.from(document.getElementById('container1').children);
let rows2 = Array.from(document.getElementById('container2').children);
const body = document.getElementsByTagName("BODY")[0];
let i = 0;
body.addEventListener('click', e => {
    const f = i % 2 !== 0 ? 0 : 360;
    document.documentElement.style.setProperty('--rotation', `${f}deg`)
    clickAnimation(rows1)
    clickAnimation(rows2)
    if (i % 4 === 0) {
        for (let x = 0; x < 10; x++) {
            if (i % 2 === 0) {
                setTimeout(() => {
                    clickAnimation(rows1)
                    clickAnimation(rows2)
                }, x * 300)
            }
            i++;
        }
    }

    i++;
})
window.addEventListener('scroll', () => {
    if (window.scrollY % 30 === 0) {
        const rotation = i % 2 !== 0 ? 0 : 360;
        document.documentElement.style.setProperty('--rotation', `${rotation}deg`)
        clickAnimation(rows1)
        clickAnimation(rows2)
        for (let x = 0; x < 10; x++) {
            if (i % 2 === 0) {
                setTimeout(() => {
                    clickAnimation(rows1)
                    clickAnimation(rows2)
                }, x * 300)
            }
            i++;
        }
    }
})


function clickAnimation(rows) {
    let random = Math.floor(Math.random() * rows.length);
    let r = Math.floor(Math.random() * 360);
    let color = `hsl(${r},${100}%,${70}% )`
    if (Math.floor(Math.random() * 10) % 5 === 0) {
//Math.floor(Math.random()*10)%5===0#
        let offset = Math.floor(Math.random() * 20)
        const rowPart = Math.round(Math.random()) ? rows1.slice(offset, 10 + offset) : rows2.slice(offset, 10 + offset);
        let rowCounter = 0
        let additionalDelay = 8;
        for (let row of rowPart) {
            let cubeCounter = 0;
            for (let cube of Array.from(row.children).reverse()) {
                 cube.style.borderRadius = `${50}% ${0}% ${0}% ${50}%`
                if (cubeCounter % 2 === 0 && rowCounter % 2 === 0) {

                    paintCube(cube, (cubeCounter + additionalDelay * 2) * 10, (cubeCounter + additionalDelay) * 35, color)
                } else if (cubeCounter % 2 !== 0 && rowCounter % 2 !== 0) {
                    paintCube(cube, (cubeCounter + additionalDelay * 2) * 10, (cubeCounter + additionalDelay) * 35, color)
                }
                cubeCounter++;
            }
            if (rowCounter < 4) {
                additionalDelay--
            } else {
                additionalDelay = rowCounter
            }
            rowCounter++;
        }
    } else {
        let rowArrLength = rows.length - 1;

        let mainRow = random;
        let before = random === 0 ? rowArrLength - 1
            : random - 1;
        let after = random === rowArrLength - 1 ? 0
            : random + 1;
        let cubeArrCenter = Array.from(rows[mainRow].children).reverse();
        let cubeArrBefore = Array.from(rows[before].children).reverse();
        let cubeArrAfter = Array.from(rows[after].children).reverse();
        for (let i = 0; i < 100; i++) {
            color = `hsl(${r},${100}%,${100 - i / 2}% )`
            let cube = cubeArrCenter[i];
            let beforeCube = cubeArrBefore[i];
            let afterCube = cubeArrAfter[i];
            paintCube(afterCube, (i + 3) * 20, (80 + i) * 15, color)
            paintCube(cube, i * 10, (50 + i) * 20, color)
            paintCube(beforeCube, (i + 3) * 25, (100 + i) * 20, color)
        }
    }
}

function paintCube(cube, delay1, delay2, color) {
    setTimeout(() => {
        cube.style.backgroundColor = color;
    }, delay1)
    setTimeout(() => {
         cube.style.borderRadius = "10%"
        cube.style.backgroundColor = 'transparent';
    }, delay2)
}


