function createPlayfairMatrix(key) {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // 'J' is removed from the alphabet
    let matrix = [];
    let seen = new Set();

    // Convert key to uppercase, replace 'J' with 'I' and remove non-alphabet characters
    key = (key + alphabet).toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    
    // Build the Playfair matrix ensuring unique characters
    for (let char of key) {
        if (!seen.has(char)) {
            seen.add(char);
            matrix.push(char);
        }
    }

    // Convert the linear array into a 5x5 matrix
    return Array.from({ length: 5 }, (_, i) => matrix.slice(i * 5, i * 5 + 5));
}

function createPlayfairLookup(matrix) {
    let lookup = {};
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            lookup[matrix[row][col]] = { row, col };
        }
    }
    return lookup;
}

function prepareText(text) {
    text = text.toUpperCase().replace(/J/g, 'I');
    
    let processedText = '';
    let spaceIndexes = [];
    
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            spaceIndexes.push(processedText.length); // Store space position
        } else if (text[i].match(/[A-Z]/)) {
            processedText += text[i];
            if (i + 1 < text.length && text[i] === text[i + 1]) {
                processedText += 'X';
            }
        }
    }
    
    if (processedText.length % 2 !== 0) {
        processedText += 'X';
    }

    return { text: processedText, spaceIndexes };
}

function restoreSpaces(text, spaceIndexes) {
    let arr = text.split('');
    spaceIndexes.forEach(index => arr.splice(index, 0, ' '));
    return arr.join('');
}

function playfairEncrypt(plaintext, key) {
    const matrix = createPlayfairMatrix(key);
    const lookup = createPlayfairLookup(matrix);
    let { text, spaceIndexes } = prepareText(plaintext);
    let ciphertext = '';

    for (let i = 0; i < text.length; i += 2) {
        let { row: r1, col: c1 } = lookup[text[i]];
        let { row: r2, col: c2 } = lookup[text[i + 1]];

        if (r1 === r2) {
            ciphertext += matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
        } else if (c1 === c2) {
            ciphertext += matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
        } else {
            ciphertext += matrix[r1][c2] + matrix[r2][c1];
        }
    }

    return restoreSpaces(ciphertext, spaceIndexes);
}

function playfairDecrypt(ciphertext, key) {
    const matrix = createPlayfairMatrix(key);
    const lookup = createPlayfairLookup(matrix);
    let spaceIndexes = [];

    let plaintext = '';

    for (let i = 0; i < ciphertext.length; i += 2) {
        let { row: r1, col: c1 } = lookup[ciphertext[i]];
        let { row: r2, col: c2 } = lookup[ciphertext[i + 1]];

        if (r1 === r2) {
            plaintext += matrix[r1][(c1 - 1 + 5) % 5] + matrix[r2][(c2 - 1 + 5) % 5];
        } else if (c1 === c2) {
            plaintext += matrix[(r1 - 1 + 5) % 5][c1] + matrix[(r2 - 1 + 5) % 5][c2];
        } else {
            plaintext += matrix[r1][c2] + matrix[r2][c1];
        }
    }

    return restoreSpaces(plaintext, spaceIndexes);
}

function encryptPlayfair() {
    const message = document.getElementById('playfairMessage').value;
    const key = document.getElementById('playfairKey').value;
    const result = playfairEncrypt(message, key);
    document.getElementById('playfairResult').textContent = result;
}

function decryptPlayfair() {
    const message = document.getElementById('playfairMessage').value;
    const key = document.getElementById('playfairKey').value;
    const result = playfairDecrypt(message, key);
    document.getElementById('playfairResult').textContent = result;
}
