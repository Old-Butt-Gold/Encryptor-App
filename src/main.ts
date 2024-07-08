import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="container">
        <h1>Encryptor App</h1>
        <label for="message">Your message:</label>
        <textarea id="message" rows="5" cols="50"></textarea>
        <label for="key">Key:</label>
        <input type="text" id="key" size="50">
        <div class="buttons">
            <button id="enc-btn">Encrypt</button>
            <button id="dec-btn">Decrypt</button>
        </div>

        <h2>Result:</h2>
        <textarea id="result" rows="5" cols="50" readonly></textarea>

    </div>
`;

function encrypt(message: string, key: string): string {
    let encryptedMessage = '';
    for (let i = 0; i < message.length; i++) {
        const messageCharCode = message.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % key.length);
        const encryptedCharCode = (messageCharCode + keyCharCode) % 65535;
        encryptedMessage += String.fromCharCode(encryptedCharCode);
    }
    return encryptedMessage;
}

function decrypt(encryptedMessage: string, key: string): string {
    let decryptedMessage = '';
    for (let i = 0; i < encryptedMessage.length; i++) {
        const encryptedCharCode = encryptedMessage.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % key.length);
        const decryptedCharCode = (encryptedCharCode - keyCharCode + 65535) % 65535;
        decryptedMessage += String.fromCharCode(decryptedCharCode);
    }
    return decryptedMessage;
}

document.querySelector<HTMLButtonElement>('#enc-btn')!.addEventListener('click', () => {
    const message = (document.querySelector<HTMLTextAreaElement>('#message')!).value;
    const key = (document.querySelector<HTMLInputElement>('#key')!).value;
    document.querySelector<HTMLDivElement>('#result')!.innerText = encrypt(message, key);
});

document.querySelector<HTMLButtonElement>('#dec-btn')!.addEventListener('click', () => {
    const encryptedMessage = (document.querySelector<HTMLTextAreaElement>('#message')!).value;
    const key = (document.querySelector<HTMLInputElement>('#key')!).value;
    document.querySelector<HTMLDivElement>('#result')!.innerText = decrypt(encryptedMessage, key);
});