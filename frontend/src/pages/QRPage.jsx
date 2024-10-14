import React from "react";
import QRCodeReader from "../components/QRCodeReader";
import GenerateQRCode from "../components/GenerateQRCode";

const QRPage = () => {
  // Define the data you want to encode in the QR code
  const data = {
    id: 1,
    name: "Sample Data",
    info: "This is a test QR code",
  };

  return (
    <div>
      {/* QR Code Reader */}
      <QRCodeReader />
      QR Code Generator
      <GenerateQRCode data={data} />
    </div>
  );
};

export default QRPage;
