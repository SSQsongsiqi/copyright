const iv = new Uint8Array([227, 121, 129, 59, 33, 35, 211, 192, 242, 167, 87, 91, 191, 152, 212, 120]);

export async function encryptArrayBuffer(arrayBuffer: ArrayBuffer, secretKey: Uint8Array): Promise<ArrayBuffer> {
    const algorithm = { name: 'AES-GCM', iv: iv };
    const key = await window.crypto.subtle.importKey('raw', secretKey, 'AES-GCM', false, ['encrypt']);
    const encryptedData = await window.crypto.subtle.encrypt(algorithm, key, arrayBuffer);
    return encryptedData;
}

export async function decryptArrayBuffer(encryptedArrayBuffer: ArrayBuffer, secretKey: Uint8Array): Promise<ArrayBuffer> {
    const algorithm = { name: 'AES-GCM', iv: iv };
    const key = await window.crypto.subtle.importKey('raw', secretKey, 'AES-GCM', false, ['decrypt']);
    const decryptedData = await window.crypto.subtle.decrypt(algorithm, key, encryptedArrayBuffer);
    return decryptedData;
}

// async function exampleUsage() {
//     const secretKey = window.crypto.getRandomValues(new Uint8Array(32)); // 生成随机的密钥
//     const originalArrayBuffer = new TextEncoder().encode('Hello, world!').buffer;

//     // 加密 ArrayBuffer
//     const encryptedArrayBuffer = await encryptArrayBuffer(originalArrayBuffer, secretKey);
//     console.log('Encrypted ArrayBuffer:', encryptedArrayBuffer);

//     // 解密 ArrayBuffer
//     const decryptedArrayBuffer = await decryptArrayBuffer(encryptedArrayBuffer, secretKey);
//     console.log('Decrypted ArrayBuffer:', decryptedArrayBuffer);

//     // 将 ArrayBuffer 转换回字符串
//     const decryptedText = new TextDecoder().decode(new Uint8Array(decryptedArrayBuffer));
//     console.log('Decrypted text:', decryptedText);
// }

// exampleUsage()