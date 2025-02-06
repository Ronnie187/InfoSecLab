function createPlayfairKeySquare(key) {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // Note: 'J' is omitted
    let keySquare = '';
    key = key.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    
    for (let char of key + alphabet) {
        if (!keySquare.includes(char)) {
            keySquare += char;
        }
    }
    
    return keySquare;
}

function prepareText(text) {
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let preparedText = '';
    
    for (let i = 0; i < text.length; i += 2) {
        preparedText += text[i];
        if (i + 1 < text.length) {
            if (text[i] === text[i + 1]) {
                preparedText += 'X';
            }
            preparedText += text[i + 1];
        }
    }
    
    if (preparedText.length % 2 !== 0) {
        preparedText += 'X';
    }
    
    return preparedText;
}

function playfairEncrypt(plaintext, key) {
    const keySquare = createPlayfairKeySquare(key);
    plaintext = prepareText(plaintext);
    let ciphertext = '';
    
    for (let i = 0; i < plaintext.length; i += 2) {
        const a = plaintext[i];
        const b = plaintext[i + 1];
        const aIndex = keySquare.indexOf(a);
        const bIndex = keySquare.indexOf(b);
        const aRow = Math.floor(aIndex / 5);
        const aCol = aIndex % 5;
        const bRow = Math.floor(bIndex / 5);
        const bCol = bIndex % 5;
        
        if (aRow === bRow) {
            ciphertext += keySquare[aRow * 5 + (aCol + 1) % 5];
            ciphertext += keySquare[bRow * 5 + (bCol + 1) % 5];
        } else if (aCol === bCol) {
            ciphertext += keySquare[((aRow + 1) % 5) * 5 + aCol];
            ciphertext += keySquare[((bRow + 1) % 5) * 5 + bCol];
        } else {
            ciphertext += keySquare[aRow * 5 + bCol];
            ciphertext += keySquare[bRow * 5 + aCol];
        }
    }
    
    return ciphertext;
}

function playfairDecrypt(ciphertext, key) {
    const keySquare = createPlayfairKeySquare(key);
    let plaintext = '';
    
    for (let i = 0; i < ciphertext.length; i += 2) {
        const a = ciphertext[i];
        const b = ciphertext[i + 1];
        const aIndex = keySquare.indexOf(a);
        const bIndex = keySquare.indexOf(b);
        const aRow = Math.floor(aIndex / 5);
        const aCol = aIndex % 5;
        const bRow = Math.floor(bIndex / 5);
        const bCol = bIndex % 5;
        
        if (aRow === bRow) {
            plaintext += keySquare[aRow * 5 + (aCol - 1 + 5) % 5];
            plaintext += keySquare[bRow * 5 + (bCol - 1 + 5) % 5];
        } else if (aCol === bCol) {
            plaintext += keySquare[((aRow - 1 + 5) % 5) * 5 + aCol];
            plaintext += keySquare[((bRow - 1 + 5) % 5) * 5 + bCol];
        } else {
            plaintext += keySquare[aRow * 5 + bCol];
            plaintext += keySquare[bRow * 5 + aCol];
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

