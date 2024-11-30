document.addEventListener('DOMContentLoaded', async () => {
    const API_URL_CREATE_TASK = 'http://localhost:5000/api/tasks'; // Replace with actual API endpoint
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    if (!token) {
        alert('You are not authenticated. Please log in.');
        window.location.href = 'login.html'; // Redirect to login page if no token
        return;
    }

    const taskData = {
        title: 'Sample Task',
        description: 'This is a test task',
        deadline: new Date(),
        priority: 'medium',
    };

    try {
        const response = await fetch(API_URL_CREATE_TASK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
            },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Task created successfully:', result);
        } else {
            const error = await response.json();
            console.error('Error creating task:', error);
        }
    } catch (error) {
        console.error('Error during API call:', error);
    }
});
