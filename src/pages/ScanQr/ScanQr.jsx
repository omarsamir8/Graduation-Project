import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function ScanQr() {
  const [scanResult, setScanResult] = useState(null);
  useEffect(() => {
    const Scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });
    Scanner.render(success, error);
    function success(result) {
      Scanner.clear();
      setScanResult(result);
    }
    function error(err) {
      console.warn(err);
    }
  }, []);

  return (
    <div className="App">
      <h1>Qr Code Scanner</h1>
      {scanResult ? (
        <div>
          success:<a href={"http://" + scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}
