
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ data }) => {
    const qrCodeRef = useRef(null);

    useEffect(() => {
        if (qrCodeRef.current && data) {
            QRCode.toCanvas(qrCodeRef.current, data, (error) => {
                if (error) console.error('Error generating QR code:', error);
            });
        }
    }, [data]);

    return <canvas ref={qrCodeRef} />;
};

export default QRCodeGenerator;
