import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

export function hashPassword(password: string): string {
  return CryptoJS.SHA256(password).toString();
}

export function hashPin(pin: string): string {
  return CryptoJS.SHA256(pin).toString();
}

export function hashSecurityAnswer(answer: string): string {
  return CryptoJS.SHA256(answer).toString();
}

export function deriveEncryptionKey(hashedPin: string): string {
  return hashedPin.substring(0, 32);
}

export function encryptData(data: string, key: string): string {
  return CryptoJS.AES.encrypt(data, key).toString();
}

export function decryptData(data: string, key: string): string {
  const bytes = CryptoJS.AES.decrypt(data, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET || '');
}