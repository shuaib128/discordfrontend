import { KEY } from "../EncriptingKey"
import CryptoJS from 'crypto-js';

export const StoreToken = (accessToken, refreshToken) => {
    try {
        const encryptionKey = KEY

        const encryptedAccessToken = CryptoJS.AES.encrypt(accessToken, encryptionKey).toString();
        const encryptedRefreshToken = CryptoJS.AES.encrypt(refreshToken, encryptionKey).toString();

        localStorage.setItem('accessToken', encryptedAccessToken, { secure: true, httpOnly: true });
        localStorage.setItem('refreshToken', encryptedRefreshToken, { secure: true, httpOnly: true });
    } catch (error) {

    }
}