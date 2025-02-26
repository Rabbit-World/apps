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
        fetch(url)
            .then(response => response.text())
            .then(data => {
                output.innerHTML += "Content loaded:\n\n";
                output.innerHTML += data.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            })
            .catch(error => {
                output.innerHTML += `Error loading content: ${error}\n`;
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
