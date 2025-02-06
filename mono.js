function generateKey() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let shuffled = alphabet.split('').sort(() => Math.random() - 0.5).join('');
    return shuffled;
}

const key = generateKey();
console.log("Substitution Key:", key);

function monoalphabeticEncrypt(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return text.split('').map(char => {
        const upperChar = char.toUpperCase();
        if (alphabet.includes(upperChar)) {
            const index = alphabet.indexOf(upperChar);
            const encryptedChar = key[index];
            return char === char.toUpperCase() ? encryptedChar : encryptedChar.toLowerCase();
        }
        return char;
    }).join('');
}

function monoalphabeticDecrypt(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return text.split('').map(char => {
        const upperChar = char.toUpperCase();
        if (key.includes(upperChar)) {
            const index = key.indexOf(upperChar);
            const decryptedChar = alphabet[index];
            return char === char.toUpperCase() ? decryptedChar : decryptedChar.toLowerCase();
        }
        return char;
    }).join('');
}

function encryptMono() {
    const message = document.getElementById('monoMessage').value;
    const result = monoalphabeticEncrypt(message, key);
    document.getElementById('monoResult').textContent = result;
}

function decryptMono() {
    const message = document.getElementById('monoMessage').value;
    const result = monoalphabeticDecrypt(message, key);
    document.getElementById('monoResult').textContent = result;
}

