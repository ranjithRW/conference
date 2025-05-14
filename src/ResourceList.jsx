import React, { useEffect, useState } from 'react';
import Scene from './Scence'; // Fixed import
//import ManModel from './ManModel';


function ResourceList() {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetch('https://githubmetricsbackend-erdfgta5drc3dzev.eastus-01.azurewebsites.net/v1/resource-details')
            .then(res => res.json())
            .then(data => {
                console.log("API response:", data);

                // **IMPORTANT: ADJUST BASED ON YOUR API RESPONSE STRUCTURE**
                // Assuming the data is in data.data and is an array.  If not, adjust this line!
                const resourceArray = Array.isArray(data.data) ? data.data : [];

                const sorted = resourceArray.sort((a, b) => a.resource.localeCompare(b.resource));
                setResources(sorted);
            })
            .catch(err => console.error('Fetch error:', err));
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Scene resources={resources} />
        </div>
    );
}

export default ResourceList;
