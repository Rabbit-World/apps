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
        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<!--[\s\S]*?-->/g, '')
            .replace(/<[^>]+>/g, '')
            .replace(/&\w+;/g, match => ({
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': '"',
                '&apos;': "'"
            }[match] || match))
            .replace(/\s+/g, ' ')
            .trim();
    }

    function loadContent(url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        output.innerHTML += `Loading ${url}...\n`;
        
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
        })
        .then(data => {
            const cleanText = sanitizeHTML(data);
            output.innerHTML += "Text content:\n\n";
            output.innerHTML += cleanText;
        })
        .catch(error => {
            if (error.message.includes('Failed to fetch')) {
                output.innerHTML += "CORS or network error. Try using a different URL.\n";
            } else {
                output.innerHTML += `Error: ${error.message}\n`;
            }
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
