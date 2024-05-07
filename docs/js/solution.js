// Ordina gli oggetti per indice
const oggettiOrdinati = oggetti.sort((a, b) => indiceOggetti[a] - indiceOggetti[b]);

// Popola la tabella
const tbody = document.getElementById("tabellaOggetti");
oggettiOrdinati.forEach(oggetto => {
    let riga = document.createElement("tr");
    let cellaIndice = document.createElement("td");
    let cellaOggetto = document.createElement("td");
    let cellaDescrizione = document.createElement("td");

    cellaIndice.textContent = indiceOggetti[oggetto];
    cellaOggetto.textContent = oggetto;
    cellaDescrizione.textContent = descrizioniOggetti[oggetto] || "Nessuna descrizione disponibile";

    riga.appendChild(cellaIndice);
    riga.appendChild(cellaOggetto);
    riga.appendChild(cellaDescrizione);
    tbody.appendChild(riga);
});
