// pages/QRCodeResultPage.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const QRCodeResultPage = () => {
    const router = useRouter();
    const { data } = router.query;

    const decodedData = data && decodeURIComponent(data);

    useEffect(() => {
        if (decodedData) {
            const newWindow = window.open('', '_blank');
            newWindow.document.write('<html><head><title>QR Code Result</title></head><body>');
            newWindow.document.write(`<h1>QR Code Result</h1><p>Data: ${decodedData}</p>`);
            newWindow.document.write('</body></html>');
        }
    }, [decodedData]);

    return null;
};

export default QRCodeResultPage;
