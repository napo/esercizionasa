const oggetti = ["fiammiferi", "cibo concentrato", "50 metri di corda di nylon", "paracadute di seta",
"unità di riscaldamento a celle solari","due pistole calibro 45","latte in polvere","mappa stellare","canotto auto-gonfiante di salvataggio","bussola magnetica","25 litri di acqua","razzi e luci di segnalazione","valigetta del pronto soccorso","ricetrasmittente alimentata dall’energia solare","bombole di ossigeno"];

function initializeTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';
    oggetti.forEach((oggetto, index) => {
        const row = tbody.insertRow();
        const cellPosition = row.insertCell(0);
        const cellObject = row.insertCell(1);
        const cellMove = row.insertCell(2);

        row.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8f9fa';

        cellPosition.textContent = index + 1;
        cellObject.textContent = oggetto;
        cellObject.draggable = true;
        cellObject.style.cursor = 'move'; // Aggiunge un indicatore visivo per il drag
        cellObject.addEventListener('dragstart', handleDragStart);
        cellObject.addEventListener('dragover', handleDragOver);
        cellObject.addEventListener('drop', handleDrop);

        cellMove.innerHTML = `<button class="btn btn-icon btn-secondary"><i class="fas fa-sort-up"></i></button>
                              <button class="btn btn-icon btn-secondary"><i class="fas fa-sort-down"></i></button>`;
        cellMove.firstChild.onclick = () => moveItem(index, 'up');
        cellMove.lastChild.onclick = () => moveItem(index, 'down');
    });
}

let dragSrcEl = null; // Traccia l'elemento sorgente del drag

function handleDragStart(e) {
    dragSrcEl = this; // Salva il riferimento all'elemento che inizia il drag
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessario per permettere il drop
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation(); // Impedisce di aprire un link dell'elemento droppato
    }
    if (dragSrcEl !== this) {
        // Scambia il contenuto tra l'elemento sorgente e l'elemento destinazione
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}

function moveItem(index, direction) {
    if (direction === 'up' && index > 0) {
        [oggetti[index], oggetti[index - 1]] = [oggetti[index - 1], oggetti[index]];
    } else if (direction === 'down' && index < oggetti.length - 1) {
        [oggetti[index], oggetti[index + 1]] = [oggetti[index + 1], oggetti[index]];
    }
    initializeTable();
}

window.onload = initializeTable;