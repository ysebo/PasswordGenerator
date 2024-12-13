let passwordHistory = [];
function copyToClipboard() {
    const password = document.getElementById('output').textContent;
    navigator.clipboard.writeText(password).then()
        alert("Password copied to clipboard!");
}

document.getElementById('copy').addEventListener('click', copyToClipboard);
document.getElementById('generate').addEventListener('click', validateStrength);

async function savePassword(password) {
    const salt = generateSalt();
    const hash = await hashPassword(password, salt); 

    const passwordData = { hash, salt };
    passwordHistory.push(passwordData); 
    updatePasswordHistory();  
}
function updatePasswordHistory() {
    document.getElementById('history').innerHTML = passwordHistory.map(item => 
        `<div>Hash: ${item.hash}</div>`
    ).join("");
}

function generateSalt() {
    return crypto.getRandomValues(new Uint8Array(16)).join('');
}

async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    
    const buffer = await crypto.subtle.digest('SHA-256', data); 
    return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
}
function validateStrength(){
    const password = document.getElementById('output').textContent;
    const strength = checkStrength(password);
    document.getElementById('strength').textContent = `Password Strength: ${strength}`;

    if (strength === 'Strong') {
        savePassword(password);
    }
}
function checkStrength(password) {
    const lengthCriteria = password.length >= 8;
    const upperCaseCriteria = /[A-Z]/.test(password);
    const lowerCaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const symbolCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
    let strength = 'Weak';

    if (lengthCriteria && upperCaseCriteria && lowerCaseCriteria && numberCriteria && symbolCriteria) {
        strength = 'Strong';
    } else if (lengthCriteria && (upperCaseCriteria || lowerCaseCriteria) && (numberCriteria || symbolCriteria)) {
        strength = 'Medium';
    }

    return strength;
}
