function field(cols_count, rows_count, mines){
    var rows = [];

    //Put mines and 0 in field
    for (var i = 0; i < rows_count; i++){
        rows[i] = [];
        for (var j = 0; j < cols_count; j++){
            //Transform array to string to better js read
           if (mines.map(x => JSON.stringify(x)).includes("["+ i +","+ j +"]")) {
              rows[i][j] = "*"; 
           } else {
               rows[i][j] = 0;
           }
        }
    }

    for (var i = 0; i < rows_count; i++){
        for (var j = 0; j < cols_count; j++){
            if (rows[i][j] != "*"){
                if (rows[i - 1] !== undefined && rows[i - 1][j - 1] === "*") rows[i][j]++;
                if (rows[i - 1] !== undefined && rows[i - 1][j    ] === "*") rows[i][j]++;
                if (rows[i - 1] !== undefined && rows[i - 1][j + 1] === "*") rows[i][j]++;

                if (rows[i][j - 1] === "*") rows[i][j]++;
                if (rows[i][j + 1] === "*") rows[i][j]++;

                if (rows[i + 1] !== undefined && rows[i + 1][j - 1] === "*") rows[i][j]++;
                if (rows[i + 1] !== undefined && rows[i + 1][j    ] === "*") rows[i][j]++;
                if (rows[i + 1] !== undefined && rows[i + 1][j + 1] === "*") rows[i][j]++;               
            }
        }
    }

    return rows;
}

function drawTable(rows) {

    var table = document.getElementById('field');
    for (var row of rows) {
        var tr = document.createElement('tr');
        for (var col of row) {
            var td = document.createElement('td');
            var span = document.createElement('span');
            span.textContent = col;
            span.setAttribute('class', 'invisible');
            td.appendChild(span);
            tr.appendChild(td);
            td.addEventListener('click', gameHandle)
        }
        table.appendChild(tr);
    }
}

//Randomize mines
function randomMines (quantity, rows, cols) {
    var mine = [];
    while(mine.length < quantity){
        console.log(mine) 
        var posRow = parseInt(Math.random() * rows);
        console.log(posRow)
        var posCol = parseInt(Math.random() * cols);
        console.log(posCol) 
        if(mine.filter(item => { return item[0] === posRow && item[1] === posCol;}).length > 0){
            continue;
        }    
        mine.push([posRow, posCol]);    
    }
    return mine;   
}


function gameHandle(event) {
    console.log(event.target.textContent)
    if(event.target.textContent === '*'){
        for (var element of document.querySelectorAll('span')){
            element.setAttribute('class', 'red')
            if (element.textContent === '*'){
                element.textContent = '';
                var createFlag = document.createElement('img');
                createFlag.setAttribute('src', 'mine.png')
                element.appendChild(createFlag)
            } 
        }
        alert('Você perdeu!');
    } else {
        event.target.childNodes[0].setAttribute('class', '');
        if (event.target.childNodes[0].textContent === '1'){
            event.target.childNodes[0].setAttribute('class', 'blue')
        } else if (event.target.childNodes[0].textContent === '2'){
            event.target.childNodes[0].setAttribute('class', 'red')
        } else if (event.target.childNodes[0].textContent === '3'){
            event.target.childNodes[0].setAttribute('class', 'green')
        } else if (event.target.childNodes[0].textContent === '4'){
            event.target.childNodes[0].setAttribute('class', 'purple')
        }   
    }
}

//New game reload
function reload() {
    document.location.reload(true);
 }

function drawField (){
    var tableSize = prompt('Whats is your table size? Example: 2, 4, 6... Max: 10');
    if (tableSize > 10) {
        alert('Your table cant be this size. Table auto setted to 10!')
        tableSize = 10;
    }
    var minesQuantity = prompt('How much mines do you want?');
    if (minesQuantity > (tableSize * tableSize)) {
        minesQuantity = (tableSize * tableSize);
    }
    var mines = randomMines(minesQuantity, tableSize, tableSize)
    drawTable(field(tableSize, tableSize, mines));
}

drawField();
