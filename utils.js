import crypto from 'crypto'
export function encryptString(valueToEncode) {
    const secret = process.env.SHA_SECRET_KEY;
    // Initializing the createHash method using secret
    const hashValue = crypto.createHash('sha256', secret)

        // Data to be encoded
        .update(valueToEncode)

        // Defining encoding type
        .digest('hex');

    return hashValue
}