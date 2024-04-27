import { useEffect } from "react";

const TidioChat = () => {
  useEffect(() => {
    // Paste your Tidio JavaScript code here
    const tidioScript = document.createElement("script");
    tidioScript.src = "//code.tidio.co/qt5twskys0r7hkkec0dvx1xrvjeh0txp.js";
    tidioScript.async = true;
    document.body.appendChild(tidioScript);

    return () => {
      // Clean up Tidio script when component unmounts
      document.body.removeChild(tidioScript);
    };
  }, []);

  return null; // Tidio chat will be injected via the script
};

export default TidioChat;
