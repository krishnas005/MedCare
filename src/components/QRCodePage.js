// QRCodePage.js
import React, { useContext } from 'react';
import { GlobalContext } from '@/context';
import QRCodeGenerator from './QRCodeGenerator';
import Link from 'next/link';

const QRCodePage = () => {
    const { ages, weights, chronic, allergie, heights } = useContext(GlobalContext);

    const qrData = `Age: ${ages}, Weight: ${weights}, Chronic Disease: ${chronic},Allergy: ${allergie},Height: ${heights}`;

    return (
        <div>
            {/* <h1>QR Code Page</h1> */}
            <QRCodeGenerator data={qrData} />
            <Link href={`/QRCodeResultPage?data=${encodeURIComponent(qrData)}`} legacyBehavior>
                <a>View QR Code Result</a>
            </Link>
        </div>
    );
};

export default QRCodePage;
