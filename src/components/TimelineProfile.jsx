import React, { useEffect, useState } from 'react';


const MyComponent = () => {
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("./Data/jobs.json"); // Replace with the correct file path
                const data = await response.json();
                setJsonData(data);
            } catch (error) {
                console.error('Error fetching JSON:', error);
            }
        };

        fetchData();
    }, []);

    // Render loading state while fetching the JSON data
    if (!jsonData) {
        return <div>Loading...</div>;
    }

    // Render the JSON data
    return (
        <div>
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
    );
};

export default MyComponent;