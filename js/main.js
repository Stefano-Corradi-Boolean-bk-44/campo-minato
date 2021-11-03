
document.getElementById('play').addEventListener('click',function(){
  play();
})


function play(){
  const level = parseInt(document.getElementById('level').value);
  // soluzione 1 per ricavare il numero di celle
  const gridLevels = [100,81,49];
  const cellNumbers = gridLevels[level-1];
  const cellsPerRow = Math.sqrt(cellNumbers); // calcolo radice quadrata delle celle totali
  const BOMBS_NUMBER = 16;
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
    // ottengo il contenuto testuale del target dell'evento
    // per cosa ci servirà? ........ 
    console.log(event.target.innerText);
    // aggingo la classe clicked alla cella cliccata
    this.classList.add('clicked');
  }

  function generateBombs(){
    const bombs = [];
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
    while(bombs.length < BOMBS_NUMBER){
      const bomb = getRandomInt(1, cellNumbers);
      if(!bombs.includes(bomb)) bombs.push(bomb);
    }

    // restituisco l'array riempito
    return bombs;
  }

}


function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}