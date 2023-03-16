import { KEY } from "../EncriptingKey"
import CryptoJS from 'crypto-js';

export const GetToken = () => {
    try {
        const encryptionKey = KEY

        const storedAccessToken = localStorage.getItem('accessToken', { secure: true, httpOnly: true });
        const storedRefreshToken = localStorage.getItem('refreshToken', { secure: true, httpOnly: true });

        const decryptedAccessToken = CryptoJS.AES.decrypt(storedAccessToken, encryptionKey).toString(CryptoJS.enc.Utf8);
        const decryptedRefreshToken = CryptoJS.AES.decrypt(storedRefreshToken, encryptionKey).toString(CryptoJS.enc.Utf8);

        return {
            accessToken: decryptedAccessToken,
            refreshToken: decryptedRefreshToken
        }
    } catch (error) {
        window.location.replace('/signin');
        return {
            accessToken: "decryptedAccessToken",
            refreshToken: "decryptedRefreshToken"
        }
    }
}