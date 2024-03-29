// src/routes/your-route/+page.server.js
export const actions = {
    default: async ({ request }) => {
        // Extract form data
        const formData = await request.formData();
        const original_url = formData.get('original_url');
        const short_url = formData.get('short_url');
        // Define the external API endpoint
        const apiEndpoint = import.meta.env.VITE_PUBLIC_API_URL
        // Prepare the data to be sent
        const dataToSend = {
            original_url: original_url,
            short_url: short_url
        };

        // Call the external API
        try {
            const response = await fetch(`${apiEndpoint}/url`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            // Handle the response from the external API
            if (response.ok) {
                const jsonResponse = await response.json();
                // Process the response data...
                return jsonResponse;
            } else {
                // Handle errors
                console.log(response.status)
                throw new Error('API call failed: ' + response.status);
            }
        } catch (error) {
            // Handle any other errors
            console.error('There was an error calling the external API', error);
        }
    }
};
