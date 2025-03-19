// utils/decryptFile.ts
export async function decryptFile(encryptedData: string, key: CryptoKey, iv: Uint8Array): Promise<Blob> {
    const encryptedBuffer = Buffer.from(encryptedData, "base64");
  
    const decryptedArrayBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedBuffer
    );
  
    return new Blob([decryptedArrayBuffer]); // Return decrypted file as Blob
  }
  