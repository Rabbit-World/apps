function generateQR() {
    var inputText = document.getElementById('inputText').value;

    if (inputText !== '') {
        document.getElementById('qrcode').innerHTML = '';
        var qrcode = new QRCode(document.getElementById('qrcode'), {
            text: inputText,
            width: 200,
            height: 200,
        });

        // Display the QR code with fade-in animation
        var qrcodeElement = document.getElementById('qrcode');
        qrcodeElement.style.display = 'block';
        setTimeout(function () {
            qrcodeElement.style.opacity = '1';
        }, 100);

        // Display the download button
        document.getElementById('downloadBtn').style.display = 'block';
    } else {
        alert('Please enter text or link');
    }
}

function downloadQR() {
    var canvas = document.querySelector('canvas');
    var imageData = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    var link = document.createElement('a');
    link.href = imageData;
    link.download = 'qrcode.png';
    link.click();
}
