function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}<>?,.';

    let chType = '';
    if (document.getElementById('uppercase').checked) chType += uppercase;
    if (document.getElementById('lowercase').checked) chType += lowercase;
    if (document.getElementById('numbers').checked) chType += numbers;
    if (document.getElementById('symbols').checked) chType += symbols;
    
    if (chType.length === 0) {
        document.getElementById('output').textContent = 'Select at least one criteria!!!!!';
        return;
    }
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chType.charAt(Math.floor(Math.random() * chType.length));
    }

    document.getElementById('output').textContent = password;
}
document.getElementById('generate').addEventListener('click', generatePassword);