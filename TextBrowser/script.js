document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('input');

    function printWelcome() {
        output.innerHTML += "Welcome to the Text-Based Browser!\n";
        output.innerHTML += "Type 'help' for a list of commands.\n\n";
    }

    function processCommand(cmd) {
        output.innerHTML += `> ${cmd}\n`;
        
        switch(cmd.toLowerCase()) {
            case 'help':
                output.innerHTML += "Available commands:\n";
                output.innerHTML += "  help - Show this list\n";
                output.innerHTML += "  load [url] - Load a web page\n";
                output.innerHTML += "  clear - Clear the screen\n";
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            default:
                if (cmd.toLowerCase().startsWith('load ')) {
                    const url = cmd.slice(5);
                    loadContent(url);
                } else {
                    output.innerHTML += "Command not recognized. Type 'help' for a list of commands.\n";
                }
        }
        output.innerHTML += "\n";
        output.scrollTop = output.scrollHeight;
    }

    function loadContent(url) {
        output.innerHTML += `Loading ${url}...\n`;
        
        // Fix per URL senza protocollo
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }

        fetch(url)
            .then(response => response.text())
            .then(data => {
                // Modifica ESSENZIALE: Rimozione tag HTML
                const cleanData = data
                    .replace(/<script.*?<\/script>/gs, '') // Rimuove gli script
                    .replace(/<style.*?<\/style>/gs, '')    // Rimuove gli stili
                    .replace(/<[^>]+>/g, '')               // Rimuove altri tag
                    .replace(/\s+/g, ' ')                   // Normalizza spazi
                    .trim();

                output.innerHTML += "Text content:\n\n";
                output.innerHTML += cleanData;
            })
            .catch(error => {
                output.innerHTML += `Error: ${error}\n`;
                output.innerHTML += "Pro Tip: Prova con 'load https://example.com'";
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
