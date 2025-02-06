function caesarCipher(text, shift, decrypt = false) {
    if (decrypt) shift = -shift;

    return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const shiftAmount = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - shiftAmount + shift) % 26 + 26) % 26 + shiftAmount);
        }
        return char;
    }).join('');
}

function encryptCaesar() {
    const message = document.getElementById('caesarMessage').value;
    const shift = parseInt(document.getElementById('caesarShift').value);
    const result = caesarCipher(message, shift);
    document.getElementById('caesarResult').textContent = result;
}

function decryptCaesar() {
    const message = document.getElementById('caesarMessage').value;
    const shift = parseInt(document.getElementById('caesarShift').value);
    const result = caesarCipher(message, shift, true);
    document.getElementById('caesarResult').textContent = result;
}

