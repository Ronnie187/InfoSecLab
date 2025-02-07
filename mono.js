// Arrays for uppercase and lowercase alphabets
const uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Shuffle function to create a random substitution key
function shuffleArray(array) {
    return array.slice().sort(() => Math.random() - 0.5);
}

// Make substitution key for uppercase
const uppercaseKey = shuffleArray(uppercaseAlphabet);

// To have the same key for lowercase
const lowercaseKey = uppercaseKey.map(char => char.toLowerCase());

console.log("Uppercase Key:", uppercaseKey.join(''));
console.log("Lowercase Key:", lowercaseKey.join(''));

// Encryption function
function monoalphabeticEncrypt(text) {
    return text.split('').map(char => {
        if (uppercaseAlphabet.includes(char)) {
            const index = uppercaseAlphabet.indexOf(char); // Find index in uppercase alphabet
            return uppercaseKey[index]; // Replace with corresponding character from uppercase key
        } else if (lowercaseAlphabet.includes(char)) {
            const index = lowercaseAlphabet.indexOf(char); // Find index in lowercase alphabet
            return lowercaseKey[index]; // Replace with corresponding character from lowercase key
        } else {
            return char; // Non-alphabetic characters remain unchanged
        }
    }).join('');
}

// Decryption function
function monoalphabeticDecrypt(text) {
    return text.split('').map(char => {
        if (uppercaseKey.includes(char)) {
            const index = uppercaseKey.indexOf(char); // Find index in uppercase key
            return uppercaseAlphabet[index]; // Replace with corresponding character from uppercase alphabet
        } else if (lowercaseKey.includes(char)) {
            const index = lowercaseKey.indexOf(char); // Find index in lowercase key
            return lowercaseAlphabet[index]; // Replace with corresponding character from lowercase alphabet
        } else {
            return char; // Non-alphabetic characters remain unchanged
        }
    }).join('');
}


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