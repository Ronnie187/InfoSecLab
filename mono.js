// Arrays for uppercase and lowercase alphabets
const uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Shuffle function to create a random substitution key
function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

let uppercaseKey = shuffleArray(uppercaseAlphabet);
let lowercaseKey = uppercaseKey.map(char => char.toLowerCase());

function monoalphabeticEncrypt(text) {
    return text.split('').map(char => {
        if (uppercaseAlphabet.includes(char)) {
            return uppercaseKey[uppercaseAlphabet.indexOf(char)];
        } else if (lowercaseAlphabet.includes(char)) {
            return lowercaseKey[lowercaseAlphabet.indexOf(char)];
        } else {
            return char; // Keep spaces and special characters unchanged
        }
    }).join('');
}

function monoalphabeticDecrypt(text) {
    return text.split('').map(char => {
        if (uppercaseKey.includes(char)) {
            return uppercaseAlphabet[uppercaseKey.indexOf(char)];
        } else if (lowercaseKey.includes(char)) {
            return lowercaseAlphabet[lowercaseKey.indexOf(char)];
        } else {
            return char; // Keep spaces and special characters unchanged
        }
    }).join('');
}


console.log("Uppercase Key:", uppercaseKey.join(''));
console.log("Lowercase Key:", lowercaseKey.join(''));

// Encryption function
function monoalphabeticEncrypt(text) {
    return text.split('').map(char => {
        if (uppercaseAlphabet.includes(char)) {
            return uppercaseKey[uppercaseAlphabet.indexOf(char)];
        } else if (lowercaseAlphabet.includes(char)) {
            return lowercaseKey[lowercaseAlphabet.indexOf(char)];
        } else {
            return char; // Keep spaces and special characters unchanged
        }
    }).join('');
}

// Decryption function
function monoalphabeticDecrypt(text) {
    return text.split('').map(char => {
        if (uppercaseKey.includes(char)) {
            return uppercaseAlphabet[uppercaseKey.indexOf(char)];
        } else if (lowercaseKey.includes(char)) {
            return lowercaseAlphabet[lowercaseKey.indexOf(char)];
        } else {
            return char; // Keep spaces and special characters unchanged
        }
    }).join('');
}

document.getElementById('randomKey').textContent = uppercaseKey;

function encryptMono() {
    const message = document.getElementById('monoMessage').value;
    const result = monoalphabeticEncrypt(message);
    document.getElementById('monoResult').textContent = result;
}

function decryptMono() {
    const message = document.getElementById('monoMessage').value;
    const result = monoalphabeticDecrypt(message);
    document.getElementById('monoResult').textContent = result;
}