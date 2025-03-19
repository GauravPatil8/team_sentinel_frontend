export async function encryptFile(file: File): Promise<{ encryptedData: ArrayBuffer; fileName: string }> {
    const key = await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt"]
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for AES-GCM

    const encryptedData = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        await file.arrayBuffer()
    );

    return { fileName: file.name, encryptedData };
}
