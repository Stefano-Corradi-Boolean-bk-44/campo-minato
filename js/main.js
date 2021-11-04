
document.getElementById('play').addEventListener('click',function(){
  play();
})


function play(){
  const level = parseInt(document.getElementById('level').value);
  // soluzione 1 per ricavare il numero di celle
  const gridLevels = [100,81,49];
  const cellNumbers = gridLevels[level-1];
  const cellsPerRow = Math.sqrt(cellNumbers); // calcolo radice quadrata delle celle totali
  const BOMBS_NUMBER = 1;
  const MAX_ATTEMPTS = cellNumbers - BOMBS_NUMBER;
  let attempts = 0;
  const attemptsList = [];
  const bombs = generateBombs();
  console.log(bombs);
  // soluzione 2
  /*let cellNumbers;
  let cellsPerRow;
  switch(level){
    case 1:
      cellNumbers = 100;
      cellsPerRow = 10;
      break;
    case 2:
      cellNumbers = 81;
      cellsPerRow = 9;
      break;
    case 3:
      cellNumbers = 49;
      cellsPerRow = 7;
      break;
  }*/
  console.log(cellNumbers);
  console.log(cellsPerRow);
  // resetto il main
  document.querySelector('main').innerHTML = '';
  
  generatePlayGround();


  function generatePlayGround(){
    // creo la griglia
    const grid = document.createElement('div');
    grid.className = 'grid';
    for (let i = 1; i <= cellNumbers; i++) {
      // creo ogni singola cella
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.innerHTML = `<span>${i}</span>`;
      // creo la stringa per la dimensione della cella
      const cellSize = `calc(100% / ${cellsPerRow})`;
      cell.style.width = cellSize;
      cell.style.height = cellSize;
      // gestisco il click della cella chiamando ina funzione ma SENZA TONDE
      cell.addEventListener('click', handleClickCell);

      // eseguo l'append della cella a grid
      grid.append(cell);
    }
    // eseguo l'appendo di grid a main
    document.querySelector('main').append(grid);
  }

  function handleClickCell(event){
    console.log('CLICCATO');
    // numero della cella, è un testo ma deve essere un numero
    const cellValue = parseInt(event.target.innerText);
    /* 
    1. verificare se ho preso una bomba -> se sì END GAME
    2. se non ho preso una bomba
        - incremento il conto dei tentativi validi se non è già stato fatto
        - salvo tutti i tentativi fatti
        - colo la cella di azzurro
    3. se ho completato le caselle valide -> END GAME 
    */

    // verifico se ho pestato una bomba
    // ossia verifico se il numero della cella è presente dentro l'array bombs

    if(bombs.includes(cellValue)){
      // FINE GIOCO
      endGame();
    }else{
      // verifico se il tentativo non è già stato fatto
      // se non è presente:
      if(!attemptsList.includes(cellValue)){
        // incremento il numero dei tentativi
        attempts++;
        // aggiungo il tentativo dentro l'elenco
        attemptsList.push(cellValue);
        // aggingo la classe clicked alla cella cliccata
        this.classList.add('clicked');

        // verifico se ho completato le celle
        if(attempts === MAX_ATTEMPTS) {
          // se sì 
          endGame();
        }
      }
      
    }
  }

  function endGame(){
    console.log('END GAME');
    /*
      1. fare colorare tutte le bombe
      2. 'congelare' il gioco
      3. generare un messaggio di output diverso se vinto o perso
    */
    
    // prendo tutte le celle
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      // se l'indice della cella è incluso nelle bombe
      if(bombs.includes(i + 1)){
        cells[i].classList.add('bomb');
      }

      // elimino la possiblità di cliccare ancora
      cells[i].removeEventListener('click', handleClickCell);
      // posso rimuovere il click anche così: (neutralizzo il click)
      //cells[i].style.pointerEvents = 'none';
    }

    // messaggio di output
    let msg = '';
    // se ho vinto
    if(attempts === MAX_ATTEMPTS) {
      msg = "Complimenti! Hai vinto!!"
    }else{
      // se ho perso
      msg = `Hai perso! Ha fatto ${attempts} tentativi`;
    }
    
    const output = document.createElement('div');
    output.innerHTML = `<h5 class="p-3">${msg}</h5>`;
    document.querySelector('main').append(output);
  }

  function generateBombs(){
    const generatedBombs = [];
    // creazione di tutte le bombe
    console.log('BOMBS_NUMBER',BOMBS_NUMBER);

    /* SOLUZIONE SBAGLIATA perché non posso controllare se ci sono dei d
    for (let i = 0; i < BOMBS_NUMBER; i++) {
      const bomb = getRandomInt(1, cellNumbers)
      bombs.push(bomb);
    }*/

    // SOLUZIONE A (un po' complessa)
    /*for (let i = 0; i < BOMBS_NUMBER; i++) {
      const bomb = getRandomInt(1, cellNumbers);
      console.log('i',i);
      if(bombs.includes(bomb)){
        // se trovo la bomba decremento il contatore
        console.log('bomb',bomb);
        console.log('-------- i',i);
        i--;
      }else{
        bombs.push(bomb);
      }
    }*/

    // SOLUZIONE B - ottimale
    while(generatedBombs.length < BOMBS_NUMBER){
      const bomb = getRandomInt(1, cellNumbers);
      if(!generatedBombs.includes(bomb)) generatedBombs.push(bomb);
    }

    // restituisco l'array riempito
    return generatedBombs;
  }

}


function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}