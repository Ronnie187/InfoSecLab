// Arrays for lowercase and uppercase letters
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function caesarCipher(text, shift, decrypt = false) {
    return text.split('').map(char => {
        if (lowercaseLetters.includes(char)) {
            return shiftCharacter(char, shift, lowercaseLetters, decrypt);
        } else if (uppercaseLetters.includes(char)) {
            return shiftCharacter(char, shift, uppercaseLetters, decrypt);
        } else {
            return char; // Non-alphabetic characters remain unchanged
        }
    }).join('');
}

function shiftCharacter(char, shift, letters, decrypt) {
    const index = letters.indexOf(char); // Find the index of the character in the array
    let shiftedIndex;

    if (decrypt) {
        // Decrypt: Move left (subtract shift)
        shiftedIndex = (index - shift + letters.length) % letters.length;
    } else {
        // Encrypt: Move right (add shift)
        shiftedIndex = (index + shift) % letters.length;
    }

    return letters[shiftedIndex]; // Return the shifted character
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