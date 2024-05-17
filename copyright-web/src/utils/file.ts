import { decryptArrayBuffer, encryptArrayBuffer } from './crypto';

export async function uploadFileToIPFS(file: File) {
    const url = '/upload';

    try {
        const fileContent = await readFileContent(file);

        const headers = new Headers();
        headers.append('Content-Type', 'application/octet-stream');

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: fileContent
        });

        if (response.ok) {
            const responseData = await response.text();
            console.log('Upload successful:', responseData);
            return responseData;
        } else {
            console.error('Upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

export async function uploadEncryptedFileToIPFS(file: File, secretKey: Uint8Array) {
    const url = '/upload';

    try {
        const fileContent = await readFileContent(file);
        const encryptedFileContent = await encryptArrayBuffer(fileContent, secretKey);

        const headers = new Headers();
        headers.append('Content-Type', 'application/octet-stream');

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: encryptedFileContent
        });

        if (response.ok) {
            const responseData = await response.text();
            console.log('Upload successful:', responseData);
            return responseData;
        } else {
            console.error('Upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

async function readFileContent(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

export async function downloadFile(cid: string) {
    const resp = await fetch(`/ipfs/${cid}`)
    const arrayBuffer = await resp.arrayBuffer();
    return arrayBuffer;
}


export async function downloadAndDecrypt(cid: string, secretKey: Uint8Array) {
    const resp = await fetch(`/ipfs/${cid}`)
    const arrayBuffer = await resp.arrayBuffer();

    const decrepted = await decryptArrayBuffer(arrayBuffer, secretKey)
    return decrepted;
}