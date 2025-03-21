import crypto from "crypto";

export const encryptFiles = async (
  aesKey: Buffer,
  iv: Buffer,
  fileBuffers: Buffer[]
): Promise<Buffer[]> => {
  if (aesKey.length !== 32) {
    throw new Error("AES key must be 32 bytes for AES-256-GCM.");
  }
  if (iv.length !== 16) {
    throw new Error("IV must be 16 bytes.");
  }

  return Promise.resolve(
    fileBuffers.map((fileBuffer) => {
      const cipher = crypto.createCipheriv("aes-256-gcm", aesKey, iv);
      const encryptedData = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
      
      return Buffer.concat([encryptedData]);
    })
  );
};
