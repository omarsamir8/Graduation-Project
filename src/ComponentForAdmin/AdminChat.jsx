import React, { useEffect } from 'react';

const AdminTidioChat = () => {
    useEffect(() => {
        const tidioScript = document.createElement('script');
        tidioScript.src = 'https://code.tidio.co/<YOUR_ADMIN_TIDIO_JAVASCRIPT_CODE>';
        tidioScript.async = true;
        document.body.appendChild(tidioScript);

        return () => {
            document.body.removeChild(tidioScript);
        };
    }, []);

    return null; // Tidio chat will be injected via the script
};

export default AdminTidioChat;