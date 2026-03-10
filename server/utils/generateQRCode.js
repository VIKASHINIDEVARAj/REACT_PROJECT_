import QRCode from 'qrcode';

const generateQRCode = async (data) => {
    try {
        // Data-va string-a maathi QR generate panrom
        const qrImage = await QRCode.toDataURL(JSON.stringify(data));
        return qrImage;
    } catch (error) {
        console.error('QR Generation fail aayiduchi kiddo:', error);
        throw new Error('Could not generate QR Code');
    }
};

export default generateQRCode;