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
    // Convert text to uppercase, replace 'J' with 'I' and remove non-alphabet characters
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let preparedText = '';
    
    // Ensure pairs of letters, inserting 'X' if necessary
    for (let i = 0; i < text.length; i += 2) {
        preparedText += text[i];
        if (i + 1 < text.length) {
            if (text[i] === text[i + 1]) {
                preparedText += 'X';
            }
            preparedText += text[i + 1];
        }
    }
    
    // If the length is odd, add an 'X' at the end
    if (preparedText.length % 2 !== 0) {
        preparedText += 'X';
    }
    
    return preparedText;
}

function playfairEncrypt(plaintext, key) {
    const matrix = createPlayfairMatrix(key);
    const lookup = createPlayfairLookup(matrix);
    plaintext = prepareText(plaintext);
    let ciphertext = '';

    // Process each pair of letters
    for (let i = 0; i < plaintext.length; i += 2) {
        let { row: r1, col: c1 } = lookup[plaintext[i]];
        let { row: r2, col: c2 } = lookup[plaintext[i + 1]];

        if (r1 === r2) { // Same row -> shift right
            ciphertext += matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
        } else if (c1 === c2) { // Same column ->shift down
            ciphertext += matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
        } else { // Rectangle swap
            ciphertext += matrix[r1][c2] + matrix[r2][c1];
        }
    }
    return ciphertext;
}

function playfairDecrypt(ciphertext, key) {
    const matrix = createPlayfairMatrix(key);
    const lookup = createPlayfairLookup(matrix);
    let plaintext = '';

    // Process each pair of letters
    for (let i = 0; i < ciphertext.length; i += 2) {
        let { row: r1, col: c1 } = lookup[ciphertext[i]];
        let { row: r2, col: c2 } = lookup[ciphertext[i + 1]];

        if (r1 === r2) { // Same row -> shift left
            plaintext += matrix[r1][(c1 - 1 + 5) % 5] + matrix[r2][(c2 - 1 + 5) % 5];
        } else if (c1 === c2) { // Same column -> shift up
            plaintext += matrix[(r1 - 1 + 5) % 5][c1] + matrix[(r2 - 1 + 5) % 5][c2];
        } else { // Rectangle swap
            plaintext += matrix[r1][c2] + matrix[r2][c1];
        }
    }
    return plaintext;
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
