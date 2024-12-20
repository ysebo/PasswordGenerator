let passwordHistory = [];

document.getElementById('copy').addEventListener('click', copyToClipboard);
document.getElementById('generate').addEventListener('click', validateStrength);

function copyToClipboard() {
    const password = document.getElementById('output').textContent;
    navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
    });
}

function savePassword(password) {
    const salt = generateSalt();
    hashPassword(password, salt).then(function(hash) {
        const passwordData = { hash, salt };
        passwordHistory.push(passwordData);
        updatePasswordHistory();
    }).catch(function(error) {
        console.error('Error saving password:', error);
    });
}

function updatePasswordHistory() {
    let historyHTML = ''; 
    for (let i = 0; i < passwordHistory.length; i++) {
        historyHTML += '<div>Hash: ' + passwordHistory[i].hash + '</div>';
    }
    document.getElementById('history').innerHTML = historyHTML;
}
function generateSalt() {
    return crypto.getRandomValues(new Uint8Array(16)).join('');
}

function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password + salt); 

    return crypto.subtle.digest('SHA-256', passwordBytes).then(function(buffer) {
        let hexString = '';
        const hashArray = new Uint8Array(buffer);
        for (let i = 0; i < hashArray.length; i++) {
            hexString += hashArray[i].toString(16).padStart(2, '0');
        }
        return hexString;
    });
}

function validateStrength() {
    const password = document.getElementById('output').textContent;
    const strength = checkStrength(password);
    document.getElementById('strength').textContent = `Password Strength: ${strength}`;

    if (strength === 'Strong') {
        savePassword(password);
    }
}

function checkStrength(password) {
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSymbol = false;
    const symbols = '!@#$%^&*(),.?":{}|<>';

    for (let char of password) {
        if ('A' <= char && char <= 'Z'){
         hasUppercase = true;
        }
         if ('a' <= char && char <= 'z'){
            hasLowercase = true;
         }
        if ('0' <= char && char <= '9'){
            hasNumber = true;
        }
        if (symbols.includes(char)){
            hasSymbol = true;
        }
    }

    const lengthRequirement = password.length >= 8;

    let countOfRequirements = 0;
    if (hasUppercase){
        countOfRequirements++;
    }
    if (hasLowercase) {
        countOfRequirements++;
    }
    if (hasNumber) {
        countOfRequirements++;
    }
    if (hasSymbol){
        countOfRequirements++;
    }
    if (lengthRequirement){
        countOfRequirements++;
    }

    if (countOfRequirements == 5){
        return 'Strong';
    }
    if (3 <= countOfRequirements){
        return 'Medium';
    }
    return 'Weak';
}
