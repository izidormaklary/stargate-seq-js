let rows1 = Array.from(document.getElementById('container1').children);
let rows2 = Array.from(document.getElementById('container2').children);
const body = document.getElementsByTagName("BODY")[0];
let i = 0;
body.addEventListener('click', e => {
    const f = i % 2 !== 0 ? 0 : 360;
    document.documentElement.style.setProperty('--rotation', `${f}deg`)
    for (let row of rows1) {
        if (i % 2 === 0) {
            clickAnimation(rows1)
            clickAnimation(rows2)
            break;
        }
        let delay = rows1.indexOf(row);
        setTimeout(() => {
            clickAnimation(rows1)
        }, delay * 250)
        setTimeout(() => {
            clickAnimation(rows2)
        }, delay * 250)
    }
    i++;
})
window.addEventListener('scroll', () => {
    if (window.scrollY % 30 === 0) {
        const rotation = i % 2 !== 0 ? 0 : 360;
        document.documentElement.style.setProperty('--rotation', `${rotation}deg`)
        for (let row of rows1) {
            if (i % 2 === 0) {
                clickAnimation(rows1)
                clickAnimation(rows2)
                break;
            }else {
                let delay = Array.from(rows1).indexOf(row);
                setTimeout(() => {
                    clickAnimation(rows1)
                }, delay * 400)
                setTimeout(() => {
                    clickAnimation(rows2)
                }, delay * 400)
            }
        }

        i++;
    }
})


function clickAnimation(rows) {
    let r = Math.floor(Math.random() * 360);
    let color = `hsl(${r},${100}%,${70}% )`
    if (Math.floor(Math.random()*10)%5===0) {
//Math.floor(Math.random()*10)%5===0#
        let offset = Math.floor(Math.random()*20)
        const rowPart= Math.round(Math.random())? rows1.slice(offset,10+offset) :rows2.slice(offset,10+offset);
        let rowCounter = 0
        let additionalDelay = 8;
        for (let row of rowPart) {
            let cubeCounter = 0;
            for (let cube of Array.from(row.children).reverse()) {
                if (cubeCounter%2===0){
                paintCube(cube, (cubeCounter+additionalDelay*2) * 40,  (cubeCounter+additionalDelay) * 70, color)
                }
                cubeCounter++;
            }
            console.log(additionalDelay)
            if(rowCounter<4){
                additionalDelay--
            }else{
                additionalDelay=rowCounter
            }
            rowCounter++;
        }
    } else {

        let rowArrLength = rows.length - 1;
        let random = Math.floor(Math.random() * rowArrLength);
        let mainRow = random;
        let before = random === 0 ? rows.length - 1
            : random - 1;
        let after = random === rows.length - 1 ? 0
            : random + 1;

        let cubeArrCenter = Array.from(rows[mainRow].children).reverse();
        let cubeArrBefore = Array.from(rows[before].children).reverse();
        let cubeArrAfter = Array.from(rows[after].children).reverse();
        for (let i = 0; i < 100; i++) {
            let cube = cubeArrCenter[i];
            let beforeCube = cubeArrBefore[i];
            let afterCube = cubeArrAfter[i];
            paintCube(afterCube, (i + 3) * 25, (100 + i) * 20, color)
            paintCube(cube, i * 20, (80 + i) * 20, color)
            paintCube(beforeCube, (i + 3) * 25, (100 + i) * 20, color)
        }
    }
}

function paintCube(cube, delay1, delay2, color) {
    setTimeout(() => {
        //beforeCube.style.borderRadius = `${i}% ${0}% ${0}% ${i}%`
        cube.style.backgroundColor = color;
    }, delay1)
    setTimeout(() => {
        cube.style.backgroundColor = 'transparent';
    }, delay2)
}


