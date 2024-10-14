import { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeReader = () => {
  const qrRef = useRef(null);
  const [qrData, setQrData] = useState([]);
  const [scannerInitialized, setScannerInitialized] = useState(false);

  // Function to fetch QR code data from API with Bearer token
  const fetchQrData = async () => {
    try {
      const token = localStorage.getItem("token"); // Assume the token is stored in localStorage
      const response = await fetch("http://localhost:5001/api/qr", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });

      const result = await response.json();
      if (result.status === "success") {
        setQrData(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch QR data", error);
    }
  };

  useEffect(() => {
    fetchQrData();

    const config = { fps: 10, qrbox: 250 };
    const qrScanner = new Html5QrcodeScanner("qr-reader", config, false);

    qrScanner.render((decodedText) => {
      onScanSuccess(decodedText);
      setScannerInitialized(true);
    }, onScanError);

    return () => {
      qrScanner.clear();
    };
  }, []);

  const onScanSuccess = (decodedText) => {
    console.log(`QR Code detected: ${decodedText}`);
    alert(`QR Code detected: ${decodedText}`);
  };

  const onScanError = (error) => {
    console.error(`QR Scan Error: ${error}`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 p-5">
      {/* Left Side - QR Code Scanner */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2 mb-5 md:mb-0 md:mr-5">
        <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Scan QR Code
        </h3>

        <div
          id="qr-reader"
          ref={qrRef}
          className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center "
          style={{ width: "100%", height: "300px" }}
        >
          {/* Show fallback image when scanner is not active */}
          {!scannerInitialized && (
            <img
              src="your-image-url-here"
              alt="QR Scanner Fallback"
              className="w-32 h-32 object-contain"
            />
          )}
        </div>

        <p className="text-center text-gray-600 mt-4">
          Point your camera at a QR code to scan.
        </p>
      </div>

      {/* Right Side - QR Code Data */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2 overflow-auto h-auto md:max-h-screen">
        <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
          QR Code Details
        </h3>
        {qrData.length > 0 ? (
          qrData.map((item) => (
            <div
              key={item._id}
              className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md"
            >
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Waste Type:</strong> {item.wasteType}
              </p>
              <p>
                <strong>Weight:</strong> {item.weight} kg
              </p>
              <p>
                <strong>Level:</strong> {item.level}%
              </p>
              <p>
                <strong>Owner:</strong> {item.owner}
              </p>
              <p>
                <strong>Collector:</strong> {item.collector}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No QR data available</p>
        )}
      </div>
    </div>
  );
};

export default QRCodeReader;
