document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('input');

    function printWelcome() {
        output.innerHTML += "Benvenuto nel Browser Testuale!\n";
        output.innerHTML += "Digita 'aiuto' per la lista dei comandi.\n\n";
    }

    function processCommand(cmd) {
        output.innerHTML += `> ${cmd}\n`;
        
        switch(cmd.toLowerCase()) {
            case 'aiuto':
                output.innerHTML += "Comandi disponibili:\n";
                output.innerHTML += "  aiuto - Mostra questa lista\n";
                output.innerHTML += "  carica [url] - Carica una pagina web\n";
                output.innerHTML += "  pulisci - Pulisce lo schermo\n";
                break;
            case 'pulisci':
                output.innerHTML = '';
                break;
            default:
                if (cmd.toLowerCase().startsWith('carica ')) {
                    const url = cmd.slice(7);
                    loadContent(url);
                } else {
                    output.innerHTML += "Comando non riconosciuto. Digita 'aiuto' per la lista dei comandi.\n";
                }
        }
        output.innerHTML += "\n";
        output.scrollTop = output.scrollHeight;
    }

    function loadContent(url) {
        output.innerHTML += `Caricamento di ${url}...\n`;
        fetch(url)
            .then(response => response.text())
            .then(data => {
                output.innerHTML += "Contenuto caricato:\n\n";
                output.innerHTML += data.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            })
            .catch(error => {
                output.innerHTML += `Errore nel caricamento: ${error}\n`;
            });
    }

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value;
            input.value = '';
            processCommand(cmd);
        }
    });

    printWelcome();
});
