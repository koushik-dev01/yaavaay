import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Return() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryString = location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        if (sessionId) {
            // Navigate to success page with session_id
            navigate(`/success?session_id=${sessionId}`, { replace: true });
        } else {
            console.error('No session_id found in URL parameters.');
        }
    }, [location.search, navigate]);

    return null; // No UI to render
}

export default Return;
