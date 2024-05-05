import { enc, algo, mode, pad, lib, AES, PBKDF2 } from "crypto-js";

export const getSalt = (fileContent: string) => {
    return fileContent.slice(0, 16);
}

export const getIV = (fileContent: string) => {
    return enc.Utf8.parse(fileContent.slice(16, 32));
}

export const generateKey = (password: string, salt: string) => {
    return PBKDF2(password, salt, {
        keySize: 256/32,
        iterations: 65536,
        hasher: algo.SHA256
    })
}

export const decryptFile = async (fileContent: string, key: lib.WordArray, iv: lib.WordArray) => {
    if (fileContent == "") {
        return null;
    }

    // remove the part containing the salt and IV
    const fileContentSliced = fileContent.slice(32);
    // decrypt content using AES method
    const fileContentDecrypted = AES.decrypt(fileContentSliced, key, {
        iv: iv,
        mode: mode.CBC,
        padding: pad.Pkcs7,
    });

    return enc.Utf8.stringify(fileContentDecrypted);
}

export const encryptFile = async (fileContent: string, key: lib.WordArray, iv: lib.WordArray, salt: string) => {
    let encrypted = AES.encrypt(fileContent, key, {
        iv: iv,
        mode: mode.CBC,
        padding: pad.Pkcs7,
    });

    return salt + iv.toString(enc.Utf8) + encrypted
}