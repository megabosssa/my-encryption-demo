
import { encrypt, decrypt } from './encryption.js';

const runEncryptionDemo = async () => {
  const plainText = JSON.stringify({
    "hello": "test",
    "someKey": "someValue"
  });
  
  const hexString = "125002a964c644d5d3d8d3275982a81bd6dc2763f3daf7b6b9ab746668ac73d8";
  const encryptionKey = hexToUint8Array(hexString);
  console.log(encryptionKey);
  try {
    const encryptedData = await encrypt(plainText, encryptionKey);
    console.log("Encrypted Data:", encryptedData); // format header.encrypted_key.iv.ciphertext.authentication_tag

    const decryptedText = await decrypt(encryptedData, encryptionKey);
    console.log("Decrypted Text:", decryptedText);
  } catch (error) {
    console.error("Error during encryption/decryption process:", error);
  }
};

runEncryptionDemo();


function hexToUint8Array(hex: string): Uint8Array {
  if (hex.length !== 64) {
      throw new Error('Hex string must be 64 characters long to form a 32-byte array.');
  }
  const byteArray = new Uint8Array(32);
  for (let i = 0; i < hex.length; i += 2) {
      byteArray[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return byteArray;
}
