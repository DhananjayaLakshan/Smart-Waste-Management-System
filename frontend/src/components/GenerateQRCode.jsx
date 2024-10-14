/* eslint-disable react/prop-types */
import { QRCodeCanvas } from 'qrcode.react';

function GenerateQRCode({ data }) {
  const jsonData = JSON.stringify(data);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-5">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm md:max-w-md">
        <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Your QR Code</h3>

        <div className="flex justify-center mb-6">
          <QRCodeCanvas 
            value={jsonData} 
            size={256} 
            level="H" 
            includeMargin={true} 
            className="rounded-md border border-gray-300 p-2"
          />
        </div>

        <p className="text-center text-gray-600 mb-4">
          Scan the QR code to view the encoded data.
        </p>

        <div className="text-sm text-center bg-gray-100 p-3 rounded-md shadow-sm text-gray-800">
          <pre>{jsonData}</pre>
        </div>
      </div>
    </div>
  );
}

export default GenerateQRCode;
