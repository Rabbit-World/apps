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

    function sanitizeHTML(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    }

    function loadContent(url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        output.innerHTML += `Loading ${url}...\n`;
        
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const cleanText = sanitizeHTML(data);
                output.innerHTML += "Text content:\n\n";
                output.innerHTML += cleanText;
            })
            .catch(error => {
                output.innerHTML += `Error loading content: ${error}\n`;
                output.innerHTML += "Note: Some websites may block direct access due to CORS policies.\n";
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
