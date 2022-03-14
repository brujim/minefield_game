function field(cols_count, rows_count, mines){
    var rows = [];

    //Put mines in field
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
//New game reload
function reload() {
   return document.location.reload(true);  
}
//Game execution
function gameHandle(event) {
    if(event.target.textContent === '*'){
        for (element of document.querySelectorAll('span')){
            element.setAttribute('class', '')
        }
        alert('Você perdeu!');
    } else {
        event.target.childNodes[0].setAttribute('class', '');
    }
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
//Randomize mines **need fix when get existent array to push a new mine 
function randomMines (quantity, rows, cols) {
    var mine = [];
    for (var i = 0; i < quantity; i++){
        var posRow = parseInt(Math.random() * rows);
        var posCol = parseInt(Math.random() * cols);
        mine.push([posRow, posCol]);
    }
    return mine;
}

var mines = randomMines(10, 8, 8) // Number of Mines / Rows / Cols
drawTable(field(8, 8, mines)); // Rows / Cows / Mines